'use strict';
function cpSync(a, b) {
  const fs = require('fs');
  const path = require('path');
  fs.cpSync(
    path.join(__dirname, a),
    path.join(__dirname, b),
    {recursive: true, force: true},
  );
}
//************************************************************
const path = require('path');
const fs = require('fs');

const {execSync} = require('node:child_process');
// const {geneDexieAll} = require('./util/index.dexie');
const {geneDexieAll} = require('@vacantthinker/util_dexie_js');
const {zipAlotFileOrDir} = require('./zipFile');

let pathDirEntity = path.join(__dirname, 'addons', 'entity');
geneDexieAll(
  null,
  pathDirEntity,
  null
);

execSync('npm run webpack'); // production
// cpSync('addons', 'dist'); // development

//*******************************************
// zip firefox addons
zipAlotFileOrDir('dist', null);
// zip firefox addons source
zipAlotFileOrDir(
  null,
  {append: '--sourcecode'},
  ['.zip'],
  ['dist', 'trash'],
);

console.log('new Date()=> ', new Date());

