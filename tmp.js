'use strict';
const {geneDexieAll} = require('@vacantthinker/util_dexie_js');

const path = require('path');
const fs = require('fs');

let cwd = process.cwd();
let basename = path.basename(cwd);



let pathDirEntity = path.join(__dirname, 'entity');
let dbname = basename
let dbversion = 1
let pathDirGeneFileAddon = path.join(__dirname, 'src', 'dborm');
geneDexieAll(
  dbname,
  dbversion,
  pathDirEntity,
  pathDirGeneFileAddon,
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

console.log('tmp.js new Date()=> ', new Date());

