# 📋 Breizh Backyard To-Do List

## High priority 
- [ ] Add correct photos + alt text for accesibilitty
- [ ] Change all text to delete IA text and put real infos
- [ ] "zone de vie" , "base de vie" à modifier et standardiser
- [ ] Refaire la FAQ avec de vrais infos

## Low priority
- [ ] Add video trailer as background for the landing page + loading page in that case


## Security follow-up
- [ ] **Around 26 Nov 2026: check the DMARC reports** (Brevo → DMARC reports). DMARC was set to `p=quarantine` on 12 Nov 2026 (OVH → DNS zone → `_dmarc` TXT record). If OVH and Brevo mail both pass, change `p=quarantine` to `p=reject` in the same record. If legitimate mail fails, go back to `p=none` and find which sender isn't signed.
- After the first deploy of `dev` (CSP and new headers):
  - [x] Send one real contact form (checked on the dev preview on 13 Nov 2026: organiser copy and visitor confirmation both arrived)
  - [ ] Do one real newsletter signup and click the confirmation link
  - [ ] Download the sponsor PDF once the final version replaces the temporary one
  - [ ] After the release to `main`: check the grade on securityheaders.com

## Checklist before shipping
- [ ] check all i18n translations
- [ ] check responsiveness
- [ ] check email + inscripition flow
- [ ] check GDPR compliance
- [ ] check all the links (sponsors, partners...)
- [ ] check open graph with OpenGraph.xyz: https://opengraph.xyz 
- [ ] check favicon: https://favicon.io/favicon-checker/
- check page load speed

