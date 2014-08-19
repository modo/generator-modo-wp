/**
 * Pops OSX/Growl-style notifications on the desktop when key tasks have completed
 * @see https://github.com/dylang/grunt-notify
 */
module.exports = function (grunt, options) {
    return {
        build: {
            options: {
                title: '<%= project.name %>',
                message: 'Build completed.'
            }
        }
    };
};