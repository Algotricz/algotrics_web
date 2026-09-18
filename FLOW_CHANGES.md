# Flow Changes

## 2026-09-18

- Changed the “What we do” services from an always-visible list to a compact, pinned GSAP content-swipe sequence on desktop. Visitors scroll vertically to bring each next service’s content up from below without changing the section background.
- Positioned the pinned services sequence below the fixed navigation so the navigation never overlays the active service content.
- Added the “About Algotricz” section directly after the services sequence; the primary navigation’s About link now lands on this new section.
- Added a full-height scroll-driven entrance for the manifesto; its light panel rises completely from below the dark About section before its copy is revealed.
- Removed the manifesto section so the page now proceeds directly from the About section to the horizontal Discover/Create/Evolve sequence.
- Removed the Selected Work preview section from the homepage; the “Explore our work” action now leads directly to the dedicated Work page.
- Added a dedicated desktop viewing stage for the About section so its image and copy fully enter before the horizontal Discover/Create/Evolve sequence begins.
- Restored the homepage to normal top-to-bottom browser scrolling by removing all pinned and horizontal scroll stages. Services and Discover/Create/Evolve now appear as ordinary vertical sections with lightweight entrance reveals.
- Restored the original desktop animations only for the services and Discover/Create/Evolve sections, using native vertical scrolling to drive a contained service content-swipe and horizontal statement sequence.
- Added a dedicated About page at `/about`; the primary navigation and homepage About action now lead to the new studio story.
- Replaced the About page's “How we work” section with an “Our team” section featuring member portraits, names, and roles.
- Added a dedicated Contact page at `/contact`; navigation and project-start actions now lead to the contact form instead of the homepage footer.
