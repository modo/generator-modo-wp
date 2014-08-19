/**
 * Minifies compiled JS files in /public/lib/min
 * @see https://github.com/gruntjs/grunt-contrib-uglify
 */
module.exports = function (grunt, options) {
    return {
        application: {
            files: {
                '<%= path.min %>/scripts.min.js': ['<%= path.min %>/scripts.min.js']
            }
        },

        libraries: {
            files: {
                '<%= path.min %>/libraries.min.js': ['<%= path.min %>/libraries.min.js']
            }
        }
    };
};