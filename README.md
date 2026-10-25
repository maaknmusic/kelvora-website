# Kelvora website

The official website for **Kelvora**, the free desktop app that routes your chats across 40+ AI providers with automatic fallback.

Live site: https://maaknmusic.github.io/kelvora-website/

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Features | `features.html` |
| Download, install notes, system requirements, release notes | `download.html` |
| Pricing | `pricing.html` |
| FAQ | `faq.html` |
| Contact | `contact.html` |
| Privacy policy | `privacy.html` |
| Terms of service | `terms.html` |
| Refund policy | `refund.html` |
| Not found | `404.html` |

Styles are in `assets/styles.css` and all interactive behaviour (theme switch, mobile menu, download menu, OS detection, home-page demo, contact form) is in `assets/main.js`. There is no build step: edit the HTML files directly.

## Before you launch: things to replace

1. **Support email** – every page uses `support@kelvora.app`. Search and replace it with your real address.
2. **Download links** – buttons point to GitHub Releases in this repo:
   `https://github.com/maaknmusic/kelvora-website/releases/latest/download/<file>`
   Create a release and upload installers with exactly these names, or change the links:
   - `Kelvora-Setup-x64.exe`, `Kelvora-Setup-arm64.exe`
   - `Kelvora-arm64.dmg`, `Kelvora-x64.dmg`
   - `kelvora_amd64.deb`, `kelvora_arm64.deb`, `Kelvora-x86_64.AppImage`
3. **Pricing** – Pro is shown as ₹999 one-time with a 5-key limit on the free plan. Change these in `pricing.html` (and the matching FAQ answers) to your real offer.
4. **Buy Pro button** – currently opens the contact page. Point it at your payment link (for example Razorpay, Instamojo or Gumroad).
5. **Numbers and claims** – "40+ providers", "under 2 seconds" and "about 90 MB" should match your actual app.
6. **Legal pages** – the privacy policy, terms and refund policy are a starting point written for an Indian business. Have them reviewed by a lawyer before you take payments.
7. **Custom domain (optional)** – add a `CNAME` file with your domain, then update the `canonical` and `og:` URLs, `sitemap.xml` and `robots.txt`.

## Hosting

The site is hosted free on GitHub Pages from the `main` branch. Any change pushed to `main` goes live within a minute or two.

## Copyright

© 2026 Kelvora. All rights reserved. The text, design, logo and code in this repository may not be copied or reused without permission. Fonts are loaded from Google Fonts under their own open licences.
