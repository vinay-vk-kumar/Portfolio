# Vinay Kumar — Portfolio

> Personal portfolio of **Vinay Kumar** — Full-Stack Developer · Cloud & DevOps Engineer · ML Enthusiast

Live at → **[codewithvin.app](https://codewithvin.app)**

---

## ✨ Features

- **Interactive Terminal** — Type `help` inside the `>_` terminal to explore skills, projects, certifications, and more via CLI commands
- **Resume Preview** — In-browser PDF viewer with download option
- **Project Showcase** — VeggieMap, System-Ctrl, Brainly, Forge Todo — all with live links and tech stacks
- **Skills & Certifications** — Full-Stack, Cloud (AWS · Oracle), DevOps, ML
- **EmailJS Contact Form** — Direct email delivery from the contact section
- **Fully Responsive** — Optimized for desktop and mobile
- **Dark Theme** — Emerald-accented dark design with smooth animations

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Vanilla CSS (custom design system) |
| Contact | EmailJS (`@emailjs/browser`) |
| Fonts | Inter · JetBrains Mono (Google Fonts) |
| Icons | Font Awesome 6 |
| Deployment | Vercel / Any static host |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

---

## ⚙️ Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from your [EmailJS dashboard](https://dashboard.emailjs.com/).

> The contact form will silently fail without these — all other features work fine without them.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Entry point — composes all sections
│   └── globals.css       # Design tokens, CSS variables
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Education.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Terminal.tsx      # Interactive CLI terminal (desktop)
│   ├── ResumeModal.tsx   # In-browser PDF viewer
│   └── BackToTop.tsx
└── lib/
    └── data.ts           # Single source of truth for all content
public/
├── resume.pdf
└── Myself.jpg
```

---

## 🖥 Terminal Commands

Open the terminal by clicking `>_` (bottom-left) or pressing `Ctrl+\``:

```
help        Show all commands
about       Full about section
whoami      Quick intro
skills      Skills by category
projects    List all projects
project N   Details for project #N
education   Education history
certs       Certifications
contact     Contact info
social      GitHub & LinkedIn
resume      Open resume viewer
neofetch    System-style info card
date        Current date & time
clear       Clear terminal
exit        Close terminal
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set the environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Manual / Docker

```bash
npm run build
npm run start        # serves on port 3000
```

---

## 📄 License

MIT — feel free to use this as a template for your own portfolio.
