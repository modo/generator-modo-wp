/**
 * Assembles handlebar templates from /front-end/templates to static HTML in /public
 * @see https://github.com/assemble/assemble
 */
module.exports = function (grunt, options) {
    var pagesWithPath = {
        expand: true,
        cwd: '<%= path.cwd %>',
        src: ['<%= path.templates %>/pages/**/*.hbs'],
        dest: '<%= path.public %>',
        rename: function (src, dest) {
            return dest.replace(options.path.templates + '/pages/', options.path.public + '/');
        }
    };

    return {
        options: {
            assets: '<%= path.lib %>',
            layoutDir: '<%= path.templates %>/layouts',
            partials: ['<%= path.templates %>/partials/**/*.hbs'],
            helpers: ['<%= path.templates %>/helpers/**/*.js' ],
            data: ['<%= path.templates %>/data/**/*.json'],
            flatten: true
        },
        development: {
            options: {
                layout: '<%= path.templates %>/layouts/default.hbs',
                production: false
            },
            files: [pagesWithPath]
        },
        production: {
            options: {
                layout: '<%= path.templates %>/layouts/default.hbs',
                production: true
            },
            files: [pagesWithPath]
        }
    };
};