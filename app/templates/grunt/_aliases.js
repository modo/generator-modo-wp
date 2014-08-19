module.exports = function (grunt, options) {
    return {
        'build:development': [
            'jshint',
            'concurrent:site_development',
            'concurrent:libraries',
            'notify:build'
        ],
        'build:production': [
            'jshint',
            'concurrent:site_production',
            'concurrent:libraries',
            'uglify',
            'notify:build'
        ],
        'develop': [
            'build:development',
            'watch'
        ]
    };
};