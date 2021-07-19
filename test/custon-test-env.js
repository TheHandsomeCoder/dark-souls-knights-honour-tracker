const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextDecoer that is required by the file reader.
 * JSDOM doesn't support TextEncoder or Decoder currently, hot patch in the Node equivelant
 * 
 * More info 
 * - https://github.com/jsdom/whatwg-encoding/pull/11
 * - https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test/57713960#57713960
 * - https://github.com/jsdom/jsdom/issues/2524
 * - https://github.com/facebook/jest/issues/9983 
 * 
 */
module.exports = class CustomTestEnvironment extends Environment {
    async setup() {
        await super.setup();
        if (typeof this.global.TextDecoder === 'undefined') {
            const { TextDecoder } = require('util');
            this.global.TextDecoder = TextDecoder;
        }
    }
}