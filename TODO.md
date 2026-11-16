# Breizh Backyard to-do list

Content backlog and release checklist. The technical improvement plan is in `plan.md`.
Last reviewed: 16 Nov 2026.

## Content (before the release)

- [ ] Add the real photos and write their alt text (today the site has one photo, the lake `lac-automne.webp`)
- [ ] Re-read every page to replace AI-written text with real information (the organisers check each fact)
- [ ] Rewrite the FAQ with real answers
- [ ] Fill in what is still marked "à venir": one course figure on Home (`home.parcours.list2_value`), public transport on Infos pratiques (`infos_page.acces.p3`)
- [ ] Have the Breton text proofread by a speaker (includes the menu button labels added on 15 Nov 2026)
- [x] Have the organisers check the legal pages (Mentions légales, Politique de confidentialité): done 16 Nov 2026
- [ ] Replace the temporary sponsor PDF with the final one (`pnpm build:sponsor-kit`), then download it from the Sponsors page

## Feedback from the organisers

- [x] Paste the new `confirmation-email.html` into the Brevo double opt-in template, with the subject "Confirmez votre inscription à la newsletter Breizh Backyard". Until the release, paste a copy whose images point at `dev.breizhbackyard.com/email/` (production doesn't serve `/email/` yet): done 16 Nov 2026 with the dev images, the swap is in the release list
- [x] Do one real newsletter signup: the email arrives with its images and the confirmation works (16 Nov 2026)

## Manual tests on the dev site (before the release)

Test on https://dev.breizhbackyard.com (shared password), on a computer, an iPhone and an Android phone.

- [ ] Layout on every page, at phone, tablet and desktop widths
- [ ] The three languages on every page (the keys are in sync, `pnpm check:i18n`; this is about reading the text)
- [ ] Every link (navigation, footer, social networks, sponsors and partners)
- [ ] Home on an old or entry-level phone: if the animated background stutters or the phone heats up, delay its start (see `plan.md` 5.7)
- [ ] Cookie banner: accept, refuse, change the choice later
- [x] Contact form: organiser copy and visitor confirmation both arrive (13 Nov 2026), images show in the email (16 Nov 2026)
- [ ] Sponsors and Bénévoles forms: same check

## Release (`dev` → `main`)

Only when the organisers give the go.

- [ ] Merge `dev` into `main`
- [ ] Paste the repo version of `confirmation-email.html` into Brevo (images on `breizhbackyard.com/email/`) and check that they load
- [ ] Send one form from production and check the images of the confirmation email
- [ ] Check the link preview: https://opengraph.xyz
- [ ] Check the favicon: https://favicon.io/favicon-checker/
- [ ] Check the security headers grade on securityheaders.com
- [ ] Re-run Lighthouse on production, then follow the real measurements in Vercel Speed Insights

## Security follow-up

- [ ] **Around 26 Nov 2026: check the DMARC reports** (Brevo → DMARC reports). DMARC was set to `p=quarantine` on 12 Nov 2026 (OVH → DNS zone → `_dmarc` TXT record). If OVH and Brevo mail both pass, change `p=quarantine` to `p=reject` in the same record. If legitimate mail fails, go back to `p=none` and find which sender isn't signed.
- [ ] Delete the Preview deployments built before `c266999` (Vercel → Deployments): they have no password gate and are reachable by their exact URL since Vercel Authentication was turned off
- [ ] Add a Vercel Firewall rate-limit rule on `/api/contact`
- [ ] Before registrations open: protect the forms from signup bombing (see `plan.md`)

## Later

- [ ] Video trailer as the Home background, with a loading screen

## Done

- [x] Emoji removed from the site text (Infos pratiques sub-headings, FAQ categories, Inscriptions, Bienvenue), replaced by line icons where a marker helps (16 Nov 2026)
- [x] One name for the runners' area: "camp de base" everywhere (no "zone de vie" or "base de vie" left)
- [x] Page speed and accessibility measured with Lighthouse on `dev` (15 Nov 2026): accessibility 100 on the six pages tested
- [x] Dev site for the organising team: `dev.breizhbackyard.com` behind a shared password, email images open, Vercel Authentication off (16 Nov 2026, checked from outside)
