/**
 * Concatenates custom JS files into a single file – /lib/min/scripts.min.js
 * @see https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function (grunt, options) {
    return {
         scripts: {
             src: [
                 '<%= path.js %>/**/*.js',
                 '<%= path.js %>/scripts.js'
             ],
             dest: '<%= path.min %>/scripts.min.js'
         }
    };
};