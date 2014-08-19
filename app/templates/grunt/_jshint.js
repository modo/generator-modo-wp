/**
 * Checks js in /front-end/js for common errors and code-style
 * @see https://github.com/gruntjs/grunt-contrib-jshint
 */
module.exports = function (grunt, options) {
    return {
        source: [
            '<%= path.js %>/**/*.js'
        ]
    };
};