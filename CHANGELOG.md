# Changelog

## 2.0.6

- Position the panel from live viewport geometry instead of absolute numbers. 2.0.5
  clamped against `100vh` and `window.innerHeight`, but the view box in this shell is
  smaller than the window, so the panel still ran off the bottom edge.
- The panel now takes `bottom` and `maxHeight` only — its bottom sits flush with the
  trigger and its height falls out of the room left above it — so nothing assumes a
  pixel height. Measurements come from `visualViewport` where available, and the
  listeners follow its `resize` and `scroll`, not just the window's.
- Also dropped a `160px` floor on the height. Under a very short viewport that floor
  exceeded the space available and pushed the panel back past the top edge; the panel
  now compresses as far as it needs to and scrolls.
- Verified in headless Chromium across 1352x346, 1180x690, 800x600, and 600x300: the
  panel stays inside the view box on every one, compressing to 135px and 89px on the
  short viewports, and the Apply control stays reachable by scrolling.

## 2.0.5

- Keep the picker panel inside the viewport. The trigger sits at the foot of the
  sidebar, so the old placement pushed the panel up off the top of the window and the
  gallery, the URL field, and the hint were unreachable. The height was also guessed
  at a fixed 320px where the panel actually measures 368px.
- Placement now measures the panel and aligns its bottom with the trigger's, pulling it
  back inside the viewport on either edge, and re-placing once the panel reports its
  size. The panel bounds its own height to `100vh - 24px` and scrolls if the content is
  taller than that.
- Verified in headless Chromium: at 1180x690 the panel lands at y=127 with its bottom
  flush to the trigger and every control visible; at 500x400 it caps at 233px and
  scrolls without overflowing.

## 2.0.4

- Keep the 42px box from 2.0.1 and take the tightening from 2.0.3; that release
  changed both at once. The button is 42px tall again, matching the settings
  row, with the reduced 1px row margin.

## 2.0.3

- Tighten the foot trigger's vertical rhythm. It carried the settings row's
  42px box and `4px` row margin, which read as loose next to the global panel
  rows above it. The box now follows `hHd-Xa_panelRow` instead: 36px tall,
  `7px 8px` padding, kept full width so the hover highlight still spans the
  column. Measured against the shipped panel rows, the gap is 5px where they
  use 4px, against 10px before.

## 2.0.2

- Fix the foot trigger collapsing to content width (about 70px) instead of
  filling the sidebar, so its hover highlight was shorter than the settings
  row's. The seat is a flex item of `sidebar.footer.action`, which shrank it
  and left the row's `calc(100% + 4px)` with no basis; `width:100%` on the
  seat restores it. Measured inside the real sidebar wrapper, both rows are
  now 204x42 at the same offsets.

## 2.0.1

- The foot trigger now matches the shipped settings row exactly, so the two
  highlight over the same box on hover. The button was 32px tall with `radius-sm`,
  `0 8px` padding and a 13px label; it is now 42px with `radius-md`,
  `0 10px 0 8px` padding and a 14px label, wrapped in the same
  `calc(100% + 4px)` / `-2px` row the settings seat uses. The rail state is 36x36,
  matching the settings row's own rail rule. Hover paint was already the same
  `--dsw-alias-interactive-bg-hover`; only the box differed.

## 2.0.0

**Breaking:** the picker moved out of Settings. The entry no longer registers into
`settings.general.item`, so a composition that pinned this plugin's row there will not
find it. The new seat is `sidebar.footer.action`.

- The trigger is now a **Background** button at the sidebar foot, directly above
  Settings. It shows an icon and a label when the sidebar is wide, and a centred icon
  alone in the 56px rail.
- The gallery moved into a `position:fixed` panel placed beside the sidebar, measured
  from the button and re-placed on resize. The seat itself is too narrow to host it.
- Dropped the Settings row and its now-dead code: the picker and chevron components,
  their CSS rules, and the `row.desc` copy.
- The stored choice is unchanged (`localStorage`, `dsh.bg-switcher.selection`), so an
  existing selection survives the upgrade.

## 1.0.0

First release: a **Background** row in **Settings → General** under *Appearance*, seven
preset wallpapers or a custom image URL, filling the window and remembered across
reloads.
