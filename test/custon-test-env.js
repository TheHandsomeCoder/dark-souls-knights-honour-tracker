const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextDecoer that is required by the file reader.
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