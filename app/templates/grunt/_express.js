/**
 * Serves up files from /public at localhost:{{port}}
 * @see https://github.com/blai/grunt-express
 */
module.exports = function (grunt, options) {
    return {
        all: {
            options: {
                port: 9000,
                hostname: '0.0.0.0',
                bases: ['<%= path.public %>'],
                livereload: true
            }
        }
    };
};