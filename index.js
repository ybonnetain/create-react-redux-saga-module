const inquirer = require('inquirer');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawnSync;


const modulesRootSpawnResult = spawn('npm', ['root', '-g']);
const modulesRoot = modulesRootSpawnResult.stdout.toString().replace('\n', '');
const CHOICES = fs.readdirSync(`${modulesRoot}/create-react-redux-saga-module/etc/templates/modules`);

const QUESTIONS = [
  {
    name: 'module-type',
    type: 'list',
    message: 'What module type would you like to generate ?',
    choices: CHOICES
  },
  {
    name: 'module-group',
    type: 'input',
    message: 'Module groupe (optional, leave empty to ignore):',
    validate: function (input) {
      if (/^([@a-z\-\_\d])+$/.test(input) || input.length === 0) return true;
      else return 'Module name may only include lowercase letters, numbers, underscores, dashes and @.';
    }
  },
  {
    name: 'module-name',
    type: 'input',
    message: 'Module name:',
    validate: function (input) {
      if (/^([a-z\-\_\d])+$/.test(input)) return true;
      else return 'Module name may only include lowercase letters, numbers, underscores and dashes.';
    }
  },
  {
    name: 'module-version',
    type: 'input',
    message: 'Module version:',
    default: '0.0.1',
    validate: function (input) {
      if (/^([0-9\.])+$/.test(input)) return true;
      else return 'Module version may only include numbers and dots.';
    },
  },
];

const run = () => {

  const pwdSpawnResult = spawn('pwd', []);
  const pwd = pwdSpawnResult.stdout.toString();

  inquirer.prompt(QUESTIONS)
    .then(answers => {

      const moduleName = answers['module-name'];
      const moduleVersion = answers['module-version'];

      const templatePath = `${modulesRoot}/create-react-redux-saga-module/etc/templates/modules/${answers['module-type']}`;
      const destination = `${pwd}/src/modules/${answers['module-group']}/${answers['module-name']}`;
      shell.mkdir('-p', destination);

      walk(templatePath, function(err, data) {
        if(err){
            throw err;
        }

        data.forEach(file => {
            
          let destination;
            if (answers['module-group']) {
              destination = file.replace(`${modulesRoot}/create-react-redux-saga-module/etc/templates/modules/${answers['module-type']}`, `${pwd}/src/modules/${answers['module-group']}/${answers['module-name']}`);
          } else {
              destination = file.replace(`${modulesRoot}/create-react-redux-saga-module/etc/templates/modules/${answers['module-type']}`, `${pwd}src/modules/${answers['module-name']}`);
          }
          const stats = fs.statSync(file);

          if (stats.isDirectory()) {
            fs.mkdirSync(destination);
          }

          if (stats.isFile()) {
            const replaceMap = {
              ['%%PACK_NAME%%']: answers['module-group'] ? `${answers['module-group']}/${answers['module-name']}` : answers['module-name'],
              ['%%MODULE_GROUP%%']: answers['module-group'],
              ['%%SHORT_MOD_NAME%%']: answers['module-name'],
              ['%%MODULE_NAME%%']: moduleName,
              ['%%MODULE_VERSION%%']: moduleVersion,
            };
            const content = fs.readFileSync(file, 'utf8')
              .replace(/%%MODULE_NAME%%|%%SHORT_MOD_NAME%%|%%MODULE_GROUP%%|%%PACK_NAME%%|%%MODULE_VERSION%%/gi, (matched) => {
              return replaceMap[matched];
            });

            fs.writeFileSync(destination, content, 'utf8');
          }
        });
    });
  });
}


const walk = (dir, done) => {
  let results = [];

  fs.readdir(dir, (err, list) => {
      if (err) return done(err);

      var pending = list.length;

      if (!pending) return done(null, results);

      list.forEach(file => {
          file = path.resolve(dir, file);

          fs.stat(file, (err, stat) => {
              // If directory, execute a recursive call
              if (stat && stat.isDirectory()) {
                  // Add directory to array [comment if you need to remove the directories from the array]
                  results.push(file);

                  walk(file, (err, res) => {
                      results = results.concat(res);
                      if (!--pending) done(null, results);
                  });
              } else {
                  results.push(file);

                  if (!--pending) done(null, results);
              }
          });
      });
  });
};

module.exports = {
  run,
};
