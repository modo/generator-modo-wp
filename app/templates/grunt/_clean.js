/**
 * Removes generated files to avoid orphans
 * @see https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function (grunt, options) {
    return {
        html: ['<%= path.public %>/**/*.html']
    };
};