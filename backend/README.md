# Portfolio Backend + Admin CMS API

A complete Express + MongoDB backend for the portfolio site — handles authentication,
content management (projects, skills, education, experience, etc.), the contact form
email system, and file uploads.

## 1. Install dependencies

```bash
npm install
```

## 2. Set up your environment variables

```bash
cp .env.example .env
```

Then open `.env` and fill in:

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), then copy the connection string |
| `JWT_SECRET` | Any long random string (e.g. run `openssl rand -hex 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Whatever you want your admin login to be — used once by the seed script |
| `EMAIL_HOST` / `EMAIL_USER` / `EMAIL_PASS` | Your email provider's SMTP details. For Gmail, use an **App Password**, not your real password: https://support.google.com/accounts/answer/185833 |
| `CLOUDINARY_*` | Optional — sign up free at [Cloudinary](https://cloudinary.com) for image/PDF hosting. If left blank, uploads are stored locally in `/uploads` instead. |

## 3. Create your admin login + starter content

```bash
npm run seed
```

This creates your admin account and fills the database with your resume content
(projects, skills, education, experience, etc.) so the CMS isn't empty.

## 4. Run the server

```bash
npm run dev
```

The API will be running at `http://localhost:5000/api`.

## 5. Connect the frontend

In the frontend project, create a `.env` file with:

```
VITE_API_URL=http://localhost:5000/api
```

## API Overview

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login, returns JWT |
| GET | `/api/auth/me` | Admin | Verify current session |
| GET/PUT | `/api/profile` | Public / Admin | Site owner's profile info |
| GET/POST/PUT/DELETE | `/api/projects` | Public read / Admin write | Portfolio projects |
| GET/POST/PUT/DELETE | `/api/skills` | Public read / Admin write | Skills |
| GET/POST/PUT/DELETE | `/api/certificates` | Public read / Admin write | Certificates |
| GET/POST/PUT/DELETE | `/api/education` | Public read / Admin write | Education entries |
| GET/POST/PUT/DELETE | `/api/experience` | Public read / Admin write | Work experience |
| GET/POST/PUT/DELETE | `/api/achievements` | Public read / Admin write | Achievements |
| GET/POST/PUT/DELETE | `/api/social-links` | Public read / Admin write | GitHub/LinkedIn/etc |
| GET/POST/PUT/DELETE | `/api/testimonials` | Public read / Admin write | Testimonials |
| GET/POST/PUT/DELETE | `/api/blogs` | Public read / Admin write | Blog posts |
| GET/PUT | `/api/contact-info` | Public / Admin | Phone/email/address shown on Contact page |
| POST | `/api/contact` | Public | Visitor submits the contact form |
| GET/PATCH/DELETE | `/api/messages` | Admin | View/manage submitted messages |
| POST | `/api/upload` | Admin | Upload an image or PDF (multipart, field name `file`) |

All admin-only routes require a header: `Authorization: Bearer <token>` (from login).

## How the contact form works

1. The message is saved to MongoDB first — it's never lost, even if email fails.
2. A notification email is sent to you (`ADMIN_EMAIL`) with the visitor's details.
3. A "Thank you for contacting me" confirmation is sent back to the visitor.
4. If the notification email fails to send, the API returns an error to the visitor
   (asking them to also reach out directly) even though their message is safely stored —
   this way you're never unaware a message came in.

## Deployment

- **Render** or **Railway** both work well for this kind of Node/Express API — connect
  your GitHub repo, set the same environment variables from `.env`, and deploy.
- Make sure `CORS_ORIGIN` matches your deployed frontend URL exactly.
- Run `npm run seed` once against your production database (or locally pointed at
  the production `MONGO_URI`) to create the live admin account.

## Folder structure

```
backend/
  config/        # DB + Cloudinary setup
  controllers/    # Request handlers (business logic)
  middlewares/    # Auth, error handling, uploads, rate limiting
  models/         # Mongoose schemas
  routes/         # Express routers
  services/       # Email sending (Nodemailer)
  utils/          # Token generation, async wrapper, seed script
  validators/     # express-validator rules
  uploads/        # Local file storage fallback (if Cloudinary isn't set up)
```
