import {SWAP_OPTION, isSwapEnabled, setSwapEnabled} from '../lib/xkbOptions.js';

function assertEqual(actual, expected, message) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a !== e) {
        throw new Error(`${message}: expected ${e}, got ${a}`);
    }
}

function runTests() {
    // isSwapEnabled
    assertEqual(isSwapEnabled([]), false, 'empty options');
    assertEqual(isSwapEnabled(['compose:ralt']), false, 'unrelated option');
    assertEqual(isSwapEnabled(['caps:escape']), false, 'one-way caps:escape is not swap');
    assertEqual(isSwapEnabled([SWAP_OPTION]), true, 'swap option present');
    assertEqual(isSwapEnabled(['compose:ralt', SWAP_OPTION]), true, 'swap option with others');

    // setSwapEnabled(..., true)
    assertEqual(setSwapEnabled([], true), [SWAP_OPTION], 'enable from empty');
    assertEqual(
        setSwapEnabled(['compose:ralt', 'lv3:ralt_switch'], true),
        ['compose:ralt', 'lv3:ralt_switch', SWAP_OPTION],
        'enable preserves non-caps options'
    );
    assertEqual(
        setSwapEnabled(['compose:ralt', 'caps:escape'], true),
        ['compose:ralt', SWAP_OPTION],
        'enable replaces conflicting caps:* option'
    );
    assertEqual(
        setSwapEnabled(['compose:ralt', SWAP_OPTION], true),
        ['compose:ralt', SWAP_OPTION],
        'enable is idempotent'
    );

    // setSwapEnabled(..., false)
    assertEqual(setSwapEnabled([SWAP_OPTION], false), [], 'disable from swap-only');
    assertEqual(
        setSwapEnabled(['compose:ralt', SWAP_OPTION], false),
        ['compose:ralt'],
        'disable removes only caps:swapescape'
    );
    assertEqual(
        setSwapEnabled(['compose:ralt', 'caps:escape'], false),
        ['compose:ralt', 'caps:escape'],
        'disable leaves other caps:* options untouched'
    );

    // Non-mutating guarantee
    const original = ['compose:ralt'];
    Object.freeze(original);
    assertEqual(setSwapEnabled(original, true), ['compose:ralt', SWAP_OPTION], 'does not mutate input');

    print('All xkbOptions tests passed.');
}

runTests();
