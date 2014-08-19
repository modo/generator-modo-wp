/**
 * Concatenates all bower_component js into a single library file – /lib/min/libraries.min.js
 * @see https://github.com/sapegin/grunt-bower-concat
 */
module.exports = function (grunt, options) {
    return {
        libraries: {
            dest: '<%= path.min %>/libraries.min.js',
            exclude: [
                'bourbon',
                'neat',
                'sass-flex-mixin',
                'normalize-scss'
            ],
            dependencies: {
                'jquery': 'modernizr',
                'underscore': 'jquery'
            },
            bowerOptions: {
                relative: true
            }
        }
    };
};