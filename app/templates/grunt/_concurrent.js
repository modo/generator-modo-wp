/**
 * Performs multiple tasks at once for speedier builds
 * @see https://github.com/sindresorhus/grunt-concurrent
 */
module.exports = function (grunt, options) {
    return {
        options: {
            logConcurrentOutput: true
        },
        site_development: [
            'sass:development'm
            'concat'
        ],
        site_production: [
            'sass:production',
            'concat'
        ],
        libraries: [
            'bower_concat',
            'concat_css'
        ]
    };
};
