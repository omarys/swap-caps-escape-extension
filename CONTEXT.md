# Swap Caps & Escape Extension

A GNOME Shell extension that exposes a Quick Settings control to toggle swapping Caps Lock and Escape via the system keyboard configuration.

## Language

**Key Swap**:
A bidirectional exchange where Caps Lock acts as Escape and physical Escape acts as Caps Lock.
_Avoid_: Remap, one-way remap, key override

**Swap Toggle**:
The toggle button inside the GNOME Quick Settings menu that turns the Key Swap on and off, without a top-bar indicator icon.
_Avoid_: Tray button, panel icon, applet, indicator

**System Keymap State**:
The desktop environment's authoritative keyboard-options state that determines whether the Key Swap is currently active, regardless of whether it was changed by the Swap Toggle or externally.
_Avoid_: Extension state, local cache
