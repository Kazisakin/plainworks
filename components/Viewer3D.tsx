"use client";
import { useEffect, useRef, useState } from "react";
import type * as T from "three";

// Interactive 3D prototype of PrepLabel (model in /public/models/preplabel.glb, units mm).
const M = { D: 162, H: 105, HF: 25, SLOPE: 60, ANG: 53.13, PRN_Y: 106.5, PT: 105.2, SCR_S: 0.55, hinge: [0, 106.45, -64.7], slot: [0, 107.7, 10.3] };
const SCREENS = ["/ui/home.png", "/ui/items.png", "/ui/preview.png", "/ui/printed.png"];
const SCREEN_NAMES = ["Home", "Items", "Preview", "Printed"];
const COLORS = {
  arctic: { body: "#EDEEEA", accent: "#1C1D20", name: "Arctic" },
  sage: { body: "#9DB49A", accent: "#26302A", name: "Sage" },
  clay: { body: "#D49473", accent: "#3A2A22", name: "Clay" },
  graphite: { body: "#3A3C40", accent: "#151515", name: "Graphite" },
} as const;
type ColorKey = keyof typeof COLORS;

type Api = { setColor: (c: ColorKey) => void; toggleLid: () => Promise<void>; changeRoll: () => Promise<void> };

export default function Viewer3D() {
  const box = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [status, setStatus] = useState("Ready · tap the screen");
  const [lid, setLid] = useState(false);
  const [busy, setBusy] = useState(false);
  const [color, setColor] = useState<ColorKey>("arctic");

  useEffect(() => {
    let disposed = false, raf = 0;
    const el = box.current!;
    let cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      if (disposed) return;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: T.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
      catch { setFailed(true); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
      renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      el.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1.6, 5, 5000);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true; controls.target.set(0, 55, 0);
      controls.minDistance = 220; controls.maxDistance = 900; controls.maxPolarAngle = Math.PI * 0.52; controls.enablePan = false;

      const PI = Math.PI;
      scene.add(new THREE.HemisphereLight(0xffffff, 0xb9b4aa, 0.6 * PI));
      const key = new THREE.DirectionalLight(0xffffff, 1.1 * PI); key.position.set(-220, 380, 300);
      key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0004; key.shadow.radius = 6;
      Object.assign(key.shadow.camera, { left: -200, right: 200, top: 200, bottom: -200, near: 50, far: 1200 });
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xe8eef5, 0.5 * PI); fill.position.set(320, 160, -120); scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 0.4 * PI); rim.position.set(0, 200, -400); scene.add(rim);
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.ShadowMaterial({ opacity: 0.14 }));
      ground.rotation.x = -PI / 2; ground.position.y = -2.05; ground.receiveShadow = true; scene.add(ground);

      const tl = new THREE.TextureLoader();
      const tex = (src: string) => { const t = tl.load(src); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
      const screenTex = SCREENS.map(tex), labelTex = tex("/ui/label.png");

      const D = THREE.DoubleSide;
      const mat = {
        body: new THREE.MeshPhysicalMaterial({ color: COLORS.arctic.body, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.4, side: D }),
        accent: new THREE.MeshStandardMaterial({ color: COLORS.arctic.accent, roughness: 0.62, metalness: 0.05, side: D }),
        printer: new THREE.MeshStandardMaterial({ color: 0x121314, roughness: 0.55, metalness: 0.05, side: D }),
        cavity: new THREE.MeshStandardMaterial({ color: 0x0e0e0f, roughness: 0.9, side: D }),
        steel: new THREE.MeshStandardMaterial({ color: 0xb8bcc2, roughness: 0.3, metalness: 0.9, side: D }),
        rubber: new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.95, side: D }),
        paper: new THREE.MeshStandardMaterial({ color: 0xfbfaf6, roughness: 0.85, side: D }),
        core: new THREE.MeshStandardMaterial({ color: 0xa88a62, roughness: 0.9, side: D }),
      };
      const byNode: Record<string, T.Material> = { shell: mat.body, base: mat.accent, bezel: mat.accent, feet: mat.rubber, pbez: mat.printer, pbody: mat.cavity, door: mat.printer, tear: mat.steel, roll: mat.paper, core: mat.core };

      const model = new THREE.Group(); scene.add(model);
      const hinge = new THREE.Group(); hinge.position.set(M.hinge[0], M.hinge[1], M.hinge[2]); model.add(hinge);
      const rollGroup = new THREE.Group(); model.add(rollGroup);

      const A = (M.ANG * PI) / 180, slopeN = new THREE.Vector3(0, Math.cos(A), Math.sin(A));
      const slopePoint = (s: number, lift: number) => new THREE.Vector3(0, M.HF + (M.H - M.HF) * s, M.D / 2 - M.SLOPE * s).addScaledVector(slopeN, lift);
            let label: T.Mesh | null = null, led: T.Mesh<T.CylinderGeometry, T.MeshBasicMaterial> | null = null;

      try {
        const gltf = await new GLTFLoader().loadAsync("/models/preplabel.glb");
        if (disposed) return;
        const meshes: T.Mesh[] = [];
        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse((o) => { if ((o as T.Mesh).isMesh) meshes.push(o as T.Mesh); });
        meshes.forEach((o) => {
          const name = (o.name || o.parent?.name || "").replace(/_\d+$/, "");
          const k = Object.keys(byNode).find((n) => name === n || name.startsWith(n));
          if (o.geometry.attributes.color) o.geometry.deleteAttribute("color");
          if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals();
          o.material = (k && byNode[k]) || mat.body; o.castShadow = true; o.receiveShadow = true;
          const world = o.matrixWorld.clone(); o.parent?.remove(o); o.applyMatrix4(world);
          if (k === "door") { o.position.sub(hinge.position); hinge.add(o); }
          else if (k === "roll" || k === "core") rollGroup.add(o);
          else model.add(o);
        });
      } catch { setFailed(true); return; }

      // screen, label, LED, latch, rear ports
      const tilt = -(PI / 2 - A);
      const plane = (w: number, h: number, m: T.Material, s: number, lift: number) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); p.position.copy(slopePoint(s, lift)); p.rotation.x = tilt; model.add(p); return p; };
      plane(47, 61, new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.4 }), M.SCR_S, -2.6);
      const screenMat = new THREE.MeshBasicMaterial({ map: screenTex[0], toneMapped: false });
      const screenMesh = plane(43.2, 57.6, screenMat, M.SCR_S, -2.4);
      plane(46, 60, new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, roughness: 0.05, clearcoat: 1 }), M.SCR_S, -1.6);

      const labelBase = new THREE.Group(); labelBase.position.set(0, M.slot[1] + 0.4, M.slot[2]); model.add(labelBase);
      const lg = new THREE.PlaneGeometry(55, 40); lg.translate(0, 20, 0);
      label = new THREE.Mesh(lg, new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.8, side: D }));
      label.rotation.x = 0.12; label.castShadow = true; labelBase.add(label);

      led = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 1, 24), new THREE.MeshBasicMaterial({ color: 0x3ddc84 }));
      led.position.set(35, M.PT + 2.9, M.D / 2 - (M.PRN_Y - 36)); model.add(led);
      const latch = new THREE.Mesh(new THREE.BoxGeometry(14, 1.2, 4), new THREE.MeshStandardMaterial({ color: 0x3a3c40, roughness: 0.5 }));
      latch.position.copy(new THREE.Vector3(0, M.PT + 3.0, M.slot[2] - 6.5).sub(hinge.position)); hinge.add(latch);
      const dark = (c: number) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6 });
      const ins = (w: number, h: number, x: number, y: number) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 2), dark(0x1a1a1a)); m.position.set(x, y, -M.D / 2 + 1.2); model.add(m); };
      ins(9, 3.4, -31, 26); ins(13, 19, 22.75, 26.25);
      const dc = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 2, 32), dark(0x1a1a1a)); dc.rotation.x = PI / 2; dc.position.set(-12, 26, -M.D / 2 + 1.2); model.add(dc);

      // animation helpers
      const tweens: ((now: number) => boolean)[] = [];
      const tween = (get: () => number, set: (v: number) => void, to: number, ms: number) => new Promise<void>((res) => {
        const from = get(), t0 = performance.now();
        tweens.push((now) => { const k = reduce ? 1 : Math.min(1, (now - t0) / ms); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; set(from + (to - from) * e); if (k >= 1) { res(); return true; } return false; });
      });
      const wait = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
      const lab = label!, ledM = led!;
      const setLabel = (v: number) => lab.scale.set(1, Math.max(v, 0.001), 1);
      let lidOpen = false;
      async function lidTo(open: boolean) {
        lidOpen = open; setLid(open);
        if (open) await tween(() => lab.scale.y, setLabel, 0.001, 250);
        await tween(() => hinge.rotation.x, (v) => (hinge.rotation.x = v), open ? -1.92 : 0, 650);
        if (!open) { ledM.material.color.set(0xf5b400); await wait(500); ledM.material.color.set(0x3ddc84); await tween(() => lab.scale.y, setLabel, 1, 700); }
      }
      let camAnim: ((now: number) => void) | null = null;
      const front = new THREE.Vector3(-260, 175, 380);
      function goFront() {
        const to = front.clone().add(controls.target), from = camera.position.clone(), t0 = performance.now();
        if (reduce) { camera.position.copy(to); return; }
        camAnim = (now) => { const k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3); camera.position.lerpVectors(from, to, e); if (k >= 1) camAnim = null; };
      }

      api.current = {
        setColor: (c) => { mat.body.color.set(COLORS[c].body); mat.accent.color.set(COLORS[c].accent); },
        toggleLid: () => lidTo(!lidOpen),
        changeRoll: async () => {
          goFront();
          setStatus("1 · Lift the lid"); await lidTo(true);
          setStatus("2 · Take out the old roll");
          await tween(() => rollGroup.position.y, (v) => (rollGroup.position.y = v), 75, 700);
          await tween(() => rollGroup.position.x, (v) => (rollGroup.position.x = v), 140, 500);
          rollGroup.position.set(0, 140, 0); await wait(200);
          setStatus("3 · Drop in a new roll, pull 2 cm out");
          await tween(() => rollGroup.position.y, (v) => (rollGroup.position.y = v), 0, 800); await wait(250);
          setStatus("4 · Close the lid, it finds the gap"); await lidTo(false);
          setStatus("Ready · labels loaded"); await wait(1500); setStatus("Ready · tap the screen");
        },
      };

      // tap the screen to change UI page
      const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); let si = 0; let down: [number, number] | null = null;
      const onDown = (e: PointerEvent) => (down = [e.clientX, e.clientY]);
      const onUp = (e: PointerEvent) => {
        if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); ray.setFromCamera(ndc, camera);
        if (ray.intersectObject(screenMesh).length) { si = (si + 1) % screenTex.length; screenMat.map = screenTex[si]; screenMat.needsUpdate = true; setStatus(`${SCREEN_NAMES[si]} screen`); }
      };
      renderer.domElement.addEventListener("pointerdown", onDown); renderer.domElement.addEventListener("pointerup", onUp);

      const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.position.copy(front).multiplyScalar(w / h < 1 ? 1.45 : 1).add(controls.target); camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();

      let visible = true;
      const vis = new IntersectionObserver(([e]) => (visible = e.isIntersecting)); vis.observe(el);
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        camAnim?.(now);
        for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i](now)) tweens.splice(i, 1);
        controls.update(); renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect(); vis.disconnect(); controls.dispose();
        renderer.domElement.removeEventListener("pointerdown", onDown); renderer.domElement.removeEventListener("pointerup", onUp);
        scene.traverse((o) => { const m = o as T.Mesh; m.geometry?.dispose(); });
        Object.values(mat).forEach((m) => m.dispose()); screenTex.forEach((t) => t.dispose()); labelTex.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    })();
    return () => { disposed = true; cleanup(); };
  }, []);

  const run = async (fn: () => Promise<void>) => { if (busy || !api.current) return; setBusy(true); await fn(); setBusy(false); };

  return (
    <div>
      <div className="viewer" ref={box}>
        {!ready && !failed && <div className="viewer-loading">Loading 3D model…</div>}
        {failed && <div className="viewer-loading">The 3D view couldn&apos;t start in this browser.</div>}
        {ready && <div className="viewer-status">{status}</div>}
        {ready && <div className="viewer-hint">Drag to turn · scroll to zoom · tap the screen</div>}
      </div>
      <div className="viewer-bar">
        <div className="viewer-actions">
          <button className="pill" type="button" aria-pressed={lid} disabled={!ready || busy} onClick={() => run(() => api.current!.toggleLid())}>{lid ? "Close lid" : "Open lid"}</button>
          <button className="pill dark" type="button" disabled={!ready || busy} onClick={() => run(() => api.current!.changeRoll())}>Change the roll</button>
        </div>
        <div className="swatches" role="radiogroup" aria-label="Finish">
          <span className="name">{COLORS[color].name}</span>
          {(Object.keys(COLORS) as ColorKey[]).map((c) => (
            <button key={c} type="button" className="sw" role="radio" aria-checked={color === c} aria-label={COLORS[c].name}
              style={{ ["--c" as string]: COLORS[c].body }} onClick={() => { setColor(c); api.current?.setColor(c); }} />
          ))}
        </div>
      </div>
    </div>
  );
}
