# Changelog

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
