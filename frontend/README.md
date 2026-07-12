# Esakki Ponraj M — Portfolio Website

A complete, working portfolio site built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

The output goes into the `dist/` folder — upload that folder to any static host (Vercel, Netlify, etc.).

## How to edit your content

Everything you see on the site — your name, summary, projects, skills, experience, education,
certificates, achievements — comes from **one file**:

```
src/data/profile.ts
```

Open that file and edit the text directly. No need to touch any component code.

Two things to fill in there:
- `personalInfo.socials.github` — add your GitHub profile URL
- `personalInfo.socials.linkedin` — add your LinkedIn profile URL

## Your photo and resume

- Your photo is at `src/assets/profile.jpg` — replace this file (keep the same name) to update it.
- Your resume is at `public/resume.pdf` — replace this file (keep the same name) to update it.
  This is what the "Download Resume" and "Resume" buttons link to.

## Pages included

- Home (hero, stats, services, featured projects)
- About
- Skills
- Projects (with filtering)
- Certificates & Achievements
- Education
- Experience
- Contact (working form with validation)

## About the Contact form

The form is fully built and validates input, but it currently expects a backend API
at `VITE_API_URL` (see `src/services/api.ts`) to actually send the email and save the
message. Until that backend is deployed, submitting the form will show a friendly
error toast.

## Admin Panel (CMS)

The site includes a full admin dashboard at `/admin` — not linked anywhere on the
public site, so visitors won't stumble onto it. It lets you manage every piece of
content (profile, projects, skills, certificates, education, experience, achievements,
social links, contact info, testimonials, blogs) and view messages from the contact form,
all without touching code.

**The public pages are now fully connected to the backend.** When the backend is
running and reachable, every page — Home, About, Skills, Projects, Certificates,
Education, Experience, Contact, the navbar, footer, and Hire Me modal — pulls its
content live from the database. Edit something in `/admin` and it shows up on the
public site immediately on the next page load or refresh, no rebuild needed.

**If the backend isn't running or isn't reachable** (e.g. you're previewing the site
before deploying the backend), the site automatically falls back to the original
content baked into `src/data/profile.ts`, so it never shows a broken or empty page —
it just quietly uses the built-in content until the backend comes back.

To connect to your backend, set `VITE_API_URL` in a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

(or your deployed backend URL, e.g. `https://your-backend.onrender.com/api`)

Then:
1. Run `npm run seed` in the backend once — this creates your admin login and starter content
2. Go to `/admin/login` and sign in with the email/password from the backend's `.env`
3. Edit anything — it saves to the database and appears on the public site right away


## Deploying

This is a static site once built (`npm run build`), so it deploys easily to:
- **Vercel**: import this folder as a project, framework preset "Vite"
- **Netlify**: drag-and-drop the `dist/` folder, or connect the repo

## Tech used

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router · React Icons · React CountUp · React Toastify · Axios
