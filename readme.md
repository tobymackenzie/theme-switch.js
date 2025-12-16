theme-switch.js
=======

Simple theme switcher for websites.  Designed to be lightweight and static site compatible.  [See the demo](https://tobymackenzie.github.io/theme-switch.js/).

Works by replacing a stylesheet href with another based on a configured base path and a name selected from a dropdown.  Also can load a JS file in the same manner, if configured.  A singleton, only one per page.

Implemented as JS modules.

To use, see `/demo` for an example, but basically, `load.js` provides a `load()` function that should be configured and loaded synchronously to limit rendering without the theme styles.  It looks for a local storage variable and loads the CSS / JS if it is set.  `theme-switcher.js` provides a `themeSwitcher` function that should be configured and loaded later.  It sets up the interface for changing the theme.

Configuring JS path will cause reload of site when changing theme.

No default styles are provided, so you will want to style the button and dialog or change the markup to fit with your site styles.

License
------

<footer>
<p>SPDX-License-Identifier: 0BSD</p>
</footer>

