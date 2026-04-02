## Gautreagle Wedding Website

This is a Next.js app for the Gautreagle wedding, featuring:

- Password-protected landing page
- Tab navigation: The Day, The Weekend, Accommodation & Directions, RSVP
- RSVP page: prompts for email, validates against guest list, loads RSVP form, submits via Formspree

### Getting Started

1. Install dependencies:
	```bash
	npm install
	```
2. Run the development server:
	```bash
	npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Customization
- Update the password in `src/app/page.tsx` as needed.
- Add real guest data to `src/app/guests.json`.
- Update the Formspree endpoint in `src/app/RSVPSection.tsx`.
- Customize tab content in `src/app/page.tsx`.

### Deployment
Deploy to your preferred host (e.g., Vercel, Netlify).

---
Built with [Next.js](https://nextjs.org).
## Deploy on Vercel
