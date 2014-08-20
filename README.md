# Wordpress Site/Theme Generator

> [Yeoman](http://yeoman.io) generator for wordpress websites & themes - lets you quickly set up a project using SASS w/ [Bourbon](http://bourbon.io) & [Neat](http://neat.bourbon.io) for styling.


## Requirements

* [Node.js](http://nodejs.org)
* [Grunt CLI](http://gruntjs.org)
  ```
  npm install -g grunt-cli
  ```
* [Bower](http://bower.io)
  ```
  npm install -g bower
  ```
* [Yeoman](http://yeoman.io)
  ```
  npm install -g yo
  ```

## Usage

Clone this generator
```
git clone https://github.com/modo/generator-modo-wp.git
```

Link the directory as a local NPM package
```
cd generator-modo-wp
npm link
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo modo-wp`, it will walk you through the site configuration
```
yo modo-wp
```

## Grunt Tasks

Aliased tasks most useful when developing (configuration can be found in `grunt/aliases.js`):

* [develop](#develop)
* [build:development](#build)
* [build:production](#build)

Full list of sub-tasks (all configuration can be found in `grunt/[taskname].js`):

* [bower_concat](#bower_concat)
* [concat](#concat)
* [jshint](#jshint)
* [notify](#notify)
* [sass](#sass)
* [uglify](#uglify)
* [watch](#watch)
* [concurrent](#concurrent)

### develop
Runs `build:development` & watches files to recompile on changes
```
grunt server
```

### build
Compiles styles, and javascript into the `lib/min` directory

**Runs all compile tasks in development mode**
```
grunt build:development
```

**Runs all compile tasks in production mode,  minifying output
```
grunt build:production
```

---

### bower_concat
Concatenates all bower_component js into a single library file – `lib/min/libraries.min.js`. Bower packages typically do not need to be added manually to the configuration, but can use this to exclude & define dependencies.
```
grunt bower_concat
```

### concat
Concatenates custom JS files into a single file – `lib/min/scripts.min.js`.
```
grunt concat
```

### concat_css
Concatenates library css into a single library file – `lib/min/libraries.css`. Files must be manually added to this list, unlike `bower_concat`.
```
grunt concat_css
```

### jshint
Checks files in `lib/js` for common errors and code-style.
```
grunt jshint
```

### notify
Pops OSX/Growl-style notifications on the desktop when key tasks have completed.

### sass
Compiles files from `lib/sass` to single CSS at `lib/min/styles.css`

**Nested format w/ source maps**
```
grunt sass:development
```

**Compressed format w/o source maps**
```
grunt sass:production
```

### uglify
Minifies compiled JS files in `/public/lib/min`
```
grunt uglify
```

### watch
Watches files for changes for on-the-fly compilation & browser reload
```
grunt watch
```

### concurrent
Performs multiple tasks at once for speedier builds

**Compiles site files in development mode**
```
grunt concurrent:site_development
```

**Compiles site files in production mode**
```
grunt concurrent:site_production
```

**Compiles library files**
```
grunt concurrent:libraries
```
