/**
 * Checks js in /lib/js for common errors and code-style
 * @see https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function (grunt, options) {
    return {
        source: [
            '<%= path.js %>/**/*.js'
        ]
    };
};