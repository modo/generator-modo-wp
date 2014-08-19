module.exports = function (grunt, options) {
    return {
        'prep': [
            'clean',
            'jshint'
        ],
        'build:development': [
            'prep',
            'concurrent:site_development',
            'concurrent:libraries',
            'notify:build'
        ],
        'build:production': [
            'prep',
            'concurrent:site_production',
            'concurrent:libraries',
            'uglify',
            'notify:build'
        ],
        'server': [
            'build:development',
            'express',
            'open',
            'watch'
        ]
    };
};