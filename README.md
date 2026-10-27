# Plainworks website

Next.js 16 + Turbopack. Pages: Home, PrepLabel (with the 3D prototype), About, Contact, Privacy, Terms.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit before publishing

- `lib/site.ts`: your contact email and website address.
- `lib/photos.ts`: the real photos (Unsplash). Swap any URL, or put your own file in `public/photos/` and use "/photos/name.jpg".
- `public/models/preplabel.glb`: the 3D model used on the PrepLabel page.

## Deploy to Vercel

The site is ready to deploy as is (Next.js is detected automatically, no settings needed).

**Option A: Vercel CLI (fastest)**

```bash
npm i -g vercel
vercel          # first time: log in, accept the defaults
vercel --prod   # publish
```

**Option B: GitHub + Vercel**

1. Create an empty repo on GitHub named `plainworks` (no README).
2. In this folder:
   ```bash
   git remote add origin https://github.com/<your-username>/plainworks.git
   git push -u origin main
   ```
3. On vercel.com → Add New → Project → import the repo → Deploy.

**After the first deploy**, in Vercel → Project → Settings → Environment Variables, add:

- `NEXT_PUBLIC_CONTACT_EMAIL`: the inbox the contact form sends to
- `NEXT_PUBLIC_SITE_URL`: your domain once you add one (e.g. `https://plainworks.ca`)

Then redeploy. Add a custom domain under Settings → Domains.
