'use strict';
var request = require('request'),
    path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    yeoman = require('yeoman-generator'),
    AdmZip = require('adm-zip');

module.exports = yeoman.generators.Base.extend({
    _copyDirectory: function (src, dest) {
        var self = this,
            srcFiles = fs.readdirSync(__dirname + '/templates/' + src);

        _.each(srcFiles, function (file) {
            var filename = path.basename(file);
            self.copy(path.join(src, filename), path.join(dest, filename.replace('_', '')));
        });
    },

    yo: function () {
        console.log(this.yeoman);
    },

    downloadWordpress: function () {
        var done = this.async();
        console.log('Downloading latest version of wordpress...');
        request('https://wordpress.org/latest.zip').pipe(fs.createWriteStream('wordpress.zip')).on('close', done);
    },

    unzipWordpress: function () {
        var zip = new AdmZip('wordpress.zip');
        console.log('Unzipping wordpress...');
        zip.extractAllTo('./', true);
    },

    cleanupWordpress: function () {
        console.log('Cleaning up...');
        fs.renameSync('./wordpress', './public');
        fs.unlinkSync('wordpress.zip');
    },

    retrieveWordpressKeys: function () {
        var self = this,
            done = self.async();

        console.log('Retrieving wordpress keys...');
        request('https://api.wordpress.org/secret-key/1.1/salt/', function (err, response, body) {
            if (err) throw err;
            if (response.statusCode != 200) throw new Error('Bad response code');
            self.wp_keys = body;
            done();
        });
    },

    promptUser: function () {
        var self = this,
            done = self.async(),
            prompts = [
                {
                    name: 'siteName',
                    message: 'What is your sites\'s name ?'
                },
                {
                    name: 'wp_dbName',
                    message: 'Database name:'
                },
                {
                    name: 'wp_dbUser',
                    message: 'Database user:'
                },
                {
                    name: 'wp_dbPassword',
                    message: 'Database password:'
                },
                {
                    name: 'wp_dbHostname',
                    message: 'Database host:',
                    default: 'localhost'
                },
                {
                    name: 'wp_dbTablePrefix',
                    message: 'Database table prefix:',
                    default: 'wp_'
                }
            ];

        self.prompt(prompts, function (props) {
            _.each(props, function (value, key) {
                self[key] = value;
            });
            done();
        });
    },

    writeWordpressConfig: function () {
        this.template('_wp-config.php', 'public/wp-config.php');
    }

    /*
    scaffoldFolders: function(){
        this.mkdir('front-end');
        this.mkdir('front-end/sass');
        this.mkdir('front-end/sass/components');
        this.mkdir('front-end/sass/site');
        this.mkdir('front-end/templates');
        this.mkdir('front-end/templates/layouts');
        this.mkdir('front-end/templates/partials');
        this.mkdir('front-end/templates/helpers');
        this.mkdir('front-end/templates/data');
        this.mkdir('public');
        this.mkdir('public/lib');
        this.mkdir('public/lib/img');
        this.mkdir('public/lib/min');
        this.mkdir('grunt');
    },

    copyPackageFiles: function () {
        // NPM
        this.copy('_package.json', 'package.json');

        // Bower
        this.copy('_bower.json', 'bower.json');
    },

    copyGruntConfigs: function () {
        // Main Gruntfile
        this.template("_Gruntfile.js", "Gruntfile.js", { sitename: this.siteName });

        // Grunt Task Configurations
        this._copyDirectory('grunt', 'grunt/');
    },

    copyJSTemplates: function () {
        this.copy('js/_scripts.js', 'front-end/js/scripts.js');
    },

    copySCSSTemplates: function () {
        // Main Style File
        this.copy('sass/_styles.scss', 'front-end/sass/styles.scss');

        // Common Components
        this._copyDirectory('sass/components', 'front-end/sass/components/');
    },

    copyHBSTemplates: function () {
        // Layouts
        this._copyDirectory('hbs/layouts', 'front-end/templates/layouts');

        // Pages
        this._copyDirectory('hbs/pages', 'front-end/templates/pages');

        // Partials
        this._copyDirectory('hbs/partials', 'front-end/templates/partials');

        // Data
        this.template('hbs/data/_project.json', 'front-end/templates/data/project.json', { sitename: this.siteName });
    },

    runNpm: function () {
        var done = this.async();

        this.npmInstall('', function () {
            done();
        });
    },

    runBower: function () {
        var done = this.async();

        this.bowerInstall('', function () {
            done();
        });
    }
    */
});
