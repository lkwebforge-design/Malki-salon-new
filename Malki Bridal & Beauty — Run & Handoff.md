# Malki Bridal & Beauty — Run & Handoff

## Local preview

From the project root:

```bash
pnpm install
pnpm dev:static
```

Open `http://localhost:3000`. The website is a static React frontend; the enquiry form prepares a prefilled WhatsApp message and does not require a backend, database, payment flow or authentication.

## Production build

```bash
pnpm check
pnpm build:static
```

The static output is generated in `dist/public` and includes the built `index.html`, JavaScript, CSS and the route manifest. The managed Webdev project is configured for a static frontend build. The canonical URL in `client/index.html` is intentionally a placeholder and should be replaced after the production domain is confirmed.

## Content handoff

Temporary editorial images are referenced from managed storage and are labeled in the interface. Before launch, replace them with genuine, authorized Malki salon photographs. Update service wording, the approved Malki portrait/biography, the canonical URL, and any verified social profiles only when the client supplies them. Prices, opening hours, testimonials, credentials and appointment availability are intentionally not included.

## Appointment flow

Required enquiry fields are validated in the browser. Submission opens WhatsApp at `https://wa.me/94772780838` with the visitor’s name, service, preferred date, preferred time and any optional notes encoded into the message. The visitor must tap Send, and the salon confirms availability and advance-payment instructions directly.
