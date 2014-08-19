/**
 * Opens a tab to localhost:{{express.port}} once build/server is ready
 * @see https://github.com/jsoverson/grunt-open
 */
module.exports = function (grunt, options) {
    return {
        development: {
            // Gets the port from the express configuration
            path: 'http://localhost:<%= express.all.options.port%>'
        }
    };
};