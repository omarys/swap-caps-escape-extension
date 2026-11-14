export const SWAP_OPTION = 'caps:swapescape';

/**
 * Returns whether the bidirectional Caps Lock <-> Escape swap option is active.
 *
 * @param {string[]} options
 * @returns {boolean}
 */
export function isSwapEnabled(options) {
    return Array.isArray(options) && options.includes(SWAP_OPTION);
}

/**
 * Returns a new xkb-options array with caps:swapescape enabled or disabled.
 * Enabling strips any conflicting `caps:*` option while preserving all others.
 * Disabling removes only `caps:swapescape`.
 *
 * @param {string[]} options
 * @param {boolean} enabled
 * @returns {string[]}
 */
export function setSwapEnabled(options, enabled) {
    const current = Array.isArray(options) ? options : [];

    if (enabled) {
        const preserved = current.filter(opt => !opt.startsWith('caps:'));
        return [...preserved, SWAP_OPTION];
    }

    return current.filter(opt => opt !== SWAP_OPTION);
}
