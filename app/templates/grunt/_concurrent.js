/**
 * Performs multiple tasks at once for speedier builds
 * @see https://github.com/sindresorhus/grunt-concurrent
module.exports = function (grunt, options) {
    return {
        options: {
            logConcurrentOutput: true
        },
        site_development: [
            'assemble:development',
            'sass:development'
        ],
        site_production: [
            'assemble:production',
            'sass:production'
        ],
        libraries: [
            'concat_css',
            'bower_concat',
            'concat'
        ]
    };
};
