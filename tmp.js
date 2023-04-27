'use strict';

const fs = require('fs');
const path = require('path');
const {execSync} = require('node:child_process');

execSync('npm run webpack'); // production
// cpSync('addons', 'dist'); // development

//*******************************************
const {zipAlotFileOrDir} = require('./zipFile');
zipAlotFileOrDir('dist', null);
zipAlotFileOrDir(
  null,
  {append: '--sourcecode'},
  ['.zip'],
  ['dist', 'trash'],
);

console.log('new Date()=> ', new Date());

function cpSync(a, b) {
  fs.cpSync(
    path.join(__dirname, a),
    path.join(__dirname, b),
    {recursive: true, force: true},
  );
}