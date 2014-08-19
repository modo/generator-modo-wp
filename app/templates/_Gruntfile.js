module.exports = function (grunt) {
    // Setup Task Timer
    require('time-grunt')(grunt);

    // Load all task configs
    require('load-grunt-config')(grunt, {
        loadGruntTasks: {
            scope: 'devDependencies',
            pattern: ['grunt-*', 'assemble']
        },
        data: {
            project: {
                name: '<%= sitename %>'
            },
            path: {
                cwd: __dirname,
                bower: __dirname + '/bower_components',
                front: 'front-end',
                js: 'front-end/js',
                sass: 'front-end/sass',
                templates: 'front-end/templates',
                public: 'public',
                lib: 'public/lib',
                img: 'public/lib/img',
                min: 'public/lib/min'
            }
        }
    });
};