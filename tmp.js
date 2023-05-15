'use strict';

const {geneDexieAll} = require('@vacantthinker/util_dexie_js');
const path = require('path');
const fs = require('fs');

let pathDirEntity = path.join(__dirname, 'addons', 'entity');
let dbname = 'firefox-addons-only-template';
let dbversion = 1;
let pathDirGeneFileAddon = path.join(__dirname, 'addons', 'dborm');
geneDexieAll(
  dbname,
  dbversion,
  pathDirEntity,
  pathDirGeneFileAddon,
);

let pathDirGeneFileVue = path.join(__dirname, 'src');
geneDexieAll(
  dbname,
  dbversion,
  pathDirEntity,
  pathDirGeneFileVue,
);

const {execSync} = require('node:child_process');
execSync('npm run build');
execSync('npm run webpack'); // production

//*******************************************
const {zipAlotFileOrDir} = require('./zipFile');
zipAlotFileOrDir('dist', null);
zipAlotFileOrDir(
  null,
  {append: '--sourcecode'},
  ['.zip', 'package-lock.json', 'yarn.lock'],
  ['dist', 'trash', 'screenshot'],
);

console.log('new Date()=> ', new Date());

function cpSync(a, b) {
  fs.cpSync(
    path.join(__dirname, a),
    path.join(__dirname, b),
    {recursive: true, force: true},
  );
}
