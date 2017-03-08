'use strict';

const
    pkg = require( '../package.json' ),
    inquirer = require( 'inquirer' ),
    sh = require( 'shelljs' );

// Realease after build?
let buildForRelease = false;
let needsDevServer = false;

// Parse script arguments
process.argv.forEach(function (val, index, array) {
  switch ( val ) {
    case '--build-for-release' :
      buildForRelease = true;
      break;
    case '--dev-server' :
      needsDevServer = true;
      break;
  }
});

let target = undefined;
let bucket = pkg.config.aws.buckets;


function confirmDestination(bucket, prefix) {

  return inquirer.prompt({
    message: 'Confirm destination: "' + bucket,
    name: 'confirm',
    type: 'confirm'
  });
}

target = pkg.config.target;
build();


function build () {

  let command = ''
  if ( !needsDevServer ) {
     command += 'rimraf dist/'+target // clean previous build
     command += ' &&rimraf tmp ' // clean tmp
     command += ' && '
   }
   command += ' '+(needsDevServer? 'webpack-dev-server':'webpack'); // webpack server or regular webpack?
   command += ' --config webpack.config.'+target+'.'+ (needsDevServer?'dev':'prod' ) +'.js '; // proper config, proper target
   command += needsDevServer ? ' --watch --colors --inline  --progress  --host 0.0.0.0 ' + (target == 'dashboard' ? '--https' : '') : ' --bail --progress --profile ';

   command + '';

  sh.exec( command, function(argument) {
    if ( buildForRelease ) {

      confirmDestination(bucket).then(function(response) {
        if ( response.confirm ) {
          sh.exec( `node scripts/release.js ${target} ${bucket}` );
        }
      });
    }
  } );
}
