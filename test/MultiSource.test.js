import '@meisterplayer/meister-mock';
import MultiSource from '../src/js/MultiSource';

const PLUGIN_NAME = 'MultiSource';

describe('MultiSource class', () => {
    test(`pluginName should be ${PLUGIN_NAME}`, () => {
        expect(MultiSource.pluginName).toBe(PLUGIN_NAME);
    });

    test('pluginVersion should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(MultiSource.pluginVersion).toMatch(/\d+\.\d+\.\d+/);
    });
});

describe('The rest of the test suite', () => {
    test('It should be written', () => {
        const test = { testsWritten: false };

        expect(test).toEqual({ testsWritten: true });
    });
});
