import Gio from 'gi://Gio';
import GObject from 'gi://GObject';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import {QuickToggle, SystemIndicator} from 'resource:///org/gnome/shell/ui/quickSettings.js';

import {isSwapEnabled, setSwapEnabled} from './lib/xkbOptions.js';

const INPUT_SOURCES_SCHEMA = 'org.gnome.desktop.input-sources';
const XKB_OPTIONS_KEY = 'xkb-options';

const SwapCapsEscapeToggle = GObject.registerClass(
class SwapCapsEscapeToggle extends QuickToggle {
    _init() {
        super._init({
            title: 'Swap Caps & Esc',
            iconName: 'input-keyboard-symbolic',
            toggleMode: false,
        });

        this._settings = new Gio.Settings({schema_id: INPUT_SOURCES_SCHEMA});
        this._settingsChangedId = this._settings.connect(
            `changed::${XKB_OPTIONS_KEY}`,
            () => this._syncState()
        );
        this._clickedId = this.connect('clicked', () => this._onClicked());

        this._syncState();
    }

    _syncState() {
        const options = this._settings.get_strv(XKB_OPTIONS_KEY);
        this.checked = isSwapEnabled(options);
    }

    _onClicked() {
        const current = this._settings.get_strv(XKB_OPTIONS_KEY);
        const next = setSwapEnabled(current, !isSwapEnabled(current));
        this._settings.set_strv(XKB_OPTIONS_KEY, next);
        this._syncState();
    }

    destroy() {
        if (this._clickedId) {
            this.disconnect(this._clickedId);
            this._clickedId = 0;
        }
        if (this._settings && this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = 0;
        }
        this._settings = null;
        super.destroy();
    }
});

const SwapCapsEscapeIndicator = GObject.registerClass(
class SwapCapsEscapeIndicator extends SystemIndicator {
    _init() {
        super._init();
        this._toggle = new SwapCapsEscapeToggle();
        this.quickSettingsItems.push(this._toggle);
    }

    destroy() {
        this.quickSettingsItems.forEach(item => item.destroy());
        this._toggle = null;
        super.destroy();
    }
});

export default class SwapCapsEscapeExtension extends Extension {
    enable() {
        this._indicator = new SwapCapsEscapeIndicator();
        Main.panel.statusArea.quickSettings.addExternalIndicator(this._indicator);
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;
    }
}
