"use client";
import dynamic from "next/dynamic";

// Loads the 3D viewer only in the browser.
const Viewer3D = dynamic(() => import("./Viewer3D"), {
  ssr: false,
  loading: () => <div className="viewer"><div className="viewer-loading">Loading 3D model…</div></div>,
});

export default function ViewerLoader() {
  return <Viewer3D />;
}
