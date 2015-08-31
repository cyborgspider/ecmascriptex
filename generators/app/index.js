'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdir = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the remarkable ' + chalk.red('Ecmascriptex') + ' generator!'
    ));

    var prompts = [{
      name: 'siteName',
      message: 'What is the name of your site or project?'
    },{
      name: 'authorName',
      message: 'Who is authoring this site or project?',
      default: 'Carlos Ortega'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdir('dist');
      this.mkdir('images');

      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_index.jade'),
        this.destinationPath('index.jade')
      );
      this.fs.copy(
        this.templatePath('scripts/_scripts.js'),
        this.destinationPath('scripts/scripts.js')
      );
      this.fs.copy(
        this.templatePath('stylus/_index.styl'),
        this.destinationPath('stylus/index.styl')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
