'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
      this.mkdir('styles');
      this.mkdir('scripts');
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
        this.templatePath('_gulpfile.js');
        this.destinationPath('gulpfile.js');
      ):
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore');
      );
      this.fs.copy(
        this.templatePath('_index.jade'),
        this.destinationPath('index.jade');
      );
      this.fs.copy(
        this.templatePath('scripts/_scripts.js'),
        this.destinationPath('scripts/scripts.js');
      );

      // this.fs.copyTpl('_script.coffee', 'src/scripts/scripts.coffee');
      // this.fs.copyTpl('_script.js', 'src/scripts/scripts.js');
      // this.fs.copyTpl('_style.styl', 'src/styles/styles.styl');
      // this.fs.copyTpl('_style.scss', 'src/styles/styles.scss');
      // this.template('_index.jade', 'src/index.jade');
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
