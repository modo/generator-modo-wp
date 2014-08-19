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
                    name: 'themeName',
                    message: 'What would you like the theme to be called?'
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

            self.themeDir = path.join('public/wp-content/themes' + props.themeName);

            done();
        });
    },

    writeWordpressConfig: function () {
        this.template('_wp-config.php', 'public/wp-config.php');
    },

    scaffoldFolders: function(){
        this.mkdir(this.themeDir);
        this.mkdir(path.join(this.themeDir, 'lib'));
        this.mkdir(path.join(this.themeDir, 'lib/font'));
        this.mkdir(path.join(this.themeDir, 'lib/sass'));
        this.mkdir(path.join(this.themeDir, 'lib/sass/components'));
        this.mkdir(path.join(this.themeDir, 'lib/sass/site'));
        this.mkdir(path.join(this.themeDir, 'lib/js'));
        this.mkdir(path.join(this.themeDir, 'lib/js/models'));
        this.mkdir(path.join(this.themeDir, 'public/lib/img'));
        this.mkdir(path.join(this.themeDir, 'public/lib/min'));
        this.mkdir(path.join(this.themeDir, 'public/lib/inc'));
        this.mkdir(path.join(this.themeDir, 'public/lib/inc/models'));
        this.mkdir(path.join(this.themeDir, 'public/lib/inc/plugins'));
        this.mkdir(path.join(this.themeDir, 'grunt'));
    },

    downloadMetaboxPlugin: function () {
        var done = this.async();
        console.log('Downloading Metabox plugin...');
        request('https://github.com/WebDevStudios/Custom-Metaboxes-and-Fields-for-WordPress/archive/master.zip').pipe(fs.createWriteStream('metabox.zip')).on('close', done);
    },

    unzipMetaboxPlugin: function () {
        var zip = new AdmZip('metabox.zip');
        console.log('Unzipping Metabox plugin...');
        zip.extractAllTo(path.join(this.themeDir, 'lib/inc/plugins'), true);
    },

    cleanupMetaboxPlugin: function () {
        console.log('Cleaning up...');
        fs.unlinkSync('metabox.zip');
    },

    copyPackageFiles: function () {
        // NPM
        this.copy('_package.json', path.join(this.themeDir, 'package.json'));

        // Bower
        this.copy('_bower.json', path.join(this.themeDir, 'bower.json'));
    },

    copyGruntConfigs: function () {
        // Main Gruntfile
        this.template("_Gruntfile.js", path.join(this.themeDir, 'Gruntfile.js'), { sitename: this.siteName });

        // Grunt Task Configurations
        this._copyDirectory('grunt', path.join(this.themeDir, 'grunt/'));
    },

    copyJSTemplates: function () {
        this.copy('js/_scripts.js', path.join(this.themeDir, 'lib/js/scripts.js'));
    },

    copySCSSTemplates: function () {
        // Main Style File
        this.copy('sass/_styles.scss', path.join(this.themeDir, 'lib/sass/styles.scss'));

        // Common Components
        this._copyDirectory('sass/components', path.join(this.themeDir, 'lib/sass/components/'));
    },

    // TODO: Add common WP theme files

    runNpm: function () {
        var done = this.async();

        process.chdir(this.themeDir);

        this.npmInstall('', function () {
            done();
        });
    },

    runBower: function () {
        var done = this.async();

        process.chdir(this.themeDir);

        this.bowerInstall('', function () {
            done();
        });
    }
});
