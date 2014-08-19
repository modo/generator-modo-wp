/**
 * Compiles files from /lib/sass to single CSS at /lib/min/styles.css
 * @see https://github.com/sindresorhus/grunt-sass
 */
module.exports = function (grunt, options) {
    return {
        options: {
            includePaths: [
                '<%= path.sass %>',
                '<%= path.bower %>'
            ]
        },
        development: {
            options: {
                style: 'nested',
                sourceMap: true
            },
            files: {
                '<%= path.min %>/styles.css': '<%= path.sass %>/styles.scss'
            }
        },
        production: {
            options: {
                style: 'compressed'
            },
            files: {
                '<%= path.min %>/styles.css': '<%= path.sass %>/styles.scss'
            }
        }
    };
};