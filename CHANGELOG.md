# Changelog

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
