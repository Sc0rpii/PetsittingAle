# PetsittingAle

PetsittingAle is a responsive pet sitting landing page and booking flow built for a local service in Palermo, Italy. The project combines a polished frontend experience with a lightweight PHP backend designed for affordable shared hosting.

## Features

- Responsive home page with hero section, service cards, review carousel, gallery, mobile navigation, and footer.
- Dynamic JavaScript templates for service cards and customer reviews, keeping the HTML clean and maintainable.
- Booking form with real-time client-side validation and matching server-side validation.
- PHP form handler with sanitization, allowlists, honeypot field, submission timing checks, file-based rate limiting, and private email configuration.
- Privacy Policy page and required privacy acceptance checkbox recorded with each booking request.
- SEO setup for a local business: optimized metadata, canonical URLs, Open Graph tags, JSON-LD structured data, `robots.txt`, and `sitemap.xml`.
- Tailwind CSS powered design system with custom animations, responsive layout rules, and reusable component classes.

## Tech Stack

- HTML5
- Tailwind CSS 4
- JavaScript
- PHP
- Apache `.htaccess`

## Project Structure

```text
index.html
booking/
  index.html
privacy/
  index.html
form-result.php
script/
  form.js
  servicecard.js
  reviews.js
src/
  input.css
  img/
dist/
  output.css
Backend/
  Private deployment files excluded from the public GitHub repository
```

## Development

Install dependencies and rebuild CSS:

```bash
npm install
npm run build
```

Run a local static server:

```bash
python3 -m http.server 4180
```

Then open:

```text
http://127.0.0.1:4180/
```

## Backend Configuration

The backend and its real configuration are intentionally excluded from the public GitHub repository. On the production server, the PHP form handler and private `Backend/config.php` are uploaded manually.

The recipient email, sender email, and mail envelope sender must stay server-side only. They are not exposed in the frontend.

## Deployment Notes

The intended production domain is:

```text
https://www.petsittingale.it/
```

For shared hosting such as Tophost, upload the public pages, compiled CSS, JavaScript, images, backend PHP files, and `.htaccess` files. Configure HTTPS, SPF, DKIM if available, and DMARC for better email deliverability.

## Security Notes

The backend avoids trusting client-side JavaScript. It validates every field again in PHP, limits request volume by IP hash, rejects obvious bot submissions, strips unsafe characters, prevents email header injection, and stores private recipient configuration outside the public repository.

No SQL database is used in this version, so SQL injection is not part of the current attack surface. If the project later moves to MySQL, use PDO prepared statements.
