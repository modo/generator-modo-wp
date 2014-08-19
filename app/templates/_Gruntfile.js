module.exports = function (grunt) {
    // Setup Task Timer
    require('time-grunt')(grunt);

    // Load all task configs
    require('load-grunt-config')(grunt, {
        loadGruntTasks: {
            scope: 'devDependencies',
            pattern: ['grunt-*']
        },
        data: {
            project: {
                name: '<%= sitename %>'
            },
            path: {
                cwd: __dirname,
                bower: __dirname + '/bower_components',
                lib: 'lib',
                js: 'lib/js',
                sass: 'lib/sass',
                img: 'lib/img',
                min: 'lib/min'
            }
        }
    });
};