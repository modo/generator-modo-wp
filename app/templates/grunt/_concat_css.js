/**
 * Concatenates bower_component css into a single library file – /lib/min/libraries.css
 * @see https://www.npmjs.org/package/grunt-concat-css
 */
module.exports = function (grunt, options) {
    return {
        libs: {
            src: [
                // Put bower component .css files to concat here
            ],
            dest: '<%= path.min %>/libraries.css'
        }
    };
};