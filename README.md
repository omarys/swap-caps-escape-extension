# Swap Caps & Esc

A GNOME Shell extension (45–51) that adds a Quick Settings toggle to swap Caps Lock and Escape via `org.gnome.desktop.input-sources` `xkb-options` (`caps:swapescape`).

## Install

```bash
mise run install
gnome-extensions enable swap-caps-escape@omary.github.io
```

On Wayland, log out and back in after installing if the extension is newly added.

## Development

```bash
mise run check   # syntax check + GJS unit tests
mise run pack    # build dist/swap-caps-escape@omary.github.io.shell-extension.zip
```
