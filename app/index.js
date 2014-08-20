'use strict';
var request = require('request'),
    path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    yeoman = require('yeoman-generator'),
    AdmZip = require('adm-zip'),
    async = require('async');

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
                    default: '0.0.0.0'
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

            self.themeDir = path.join('public/wp-content/themes/', props.themeName);

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
        fs.renameSync(path.join(this.themeDir, 'lib/inc/plugins/Custom-Metaboxes-and-Fields-for-WordPress-master'), path.join(this.themeDir, 'lib/inc/plugins/metabox'));
    },

    copyGruntConfigs: function () {
        // Main Gruntfile
        this.template("_Gruntfile.js", path.join(this.themeDir, 'Gruntfile.js'));

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

    copyThemeSkeleton: function () {
        // Template Identifiers
        this.template('theme/_style.css', path.join(this.themeDir, 'style.css'));
        this.copy('theme/_screenshot.png', path.join(this.themeDir, 'screenshot.png'));

        // PHP Functions
        this.copy('theme/_functions.php', path.join(this.themeDir, 'functions.php'));
        this._copyDirectory('inc', path.join(this.themeDir, 'lib/inc'));

        // Page Components
        this.copy('theme/_header.php', path.join(this.themeDir, 'header.php'));
        this.copy('theme/_footer.php', path.join(this.themeDir, 'footer.php'));
        this.copy('theme/_index.php', path.join(this.themeDir, 'index.php'));
    },

    copyPackageFiles: function () {
        this.copy('_package.json', path.join('package.json'));
        this.copy('_bower.json', path.join('bower.json'));
    },

    runNpm: function () {
        var self = this,
            done = self.async();

        self.npmInstall('', function () {
            fs.renameSync('node_modules', path.join(self.themeDir, 'node_modules'));
            fs.renameSync('package.json', path.join(self.themeDir, 'package.json'));
            done();
        });
    },

    runBower: function () {
        var self = this,
            done = self.async();

        self.bowerInstall('', function () {
            fs.renameSync('bower_components', path.join(self.themeDir, 'bower_components'));
            fs.renameSync('bower.json', path.join(self.themeDir, 'bower.json'));
            done();
        });
    }
});
