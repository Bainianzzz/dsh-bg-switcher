# Changelog

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
