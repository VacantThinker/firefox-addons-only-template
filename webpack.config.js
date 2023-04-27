/**
 *
 * @param arr{Array} src file/dir arr
 * @param src{String} src path
 * @param dest{String} dest path
 * @return Array
 */
function geneFromTo(arr, src, dest) {
  const path = require('path');
  return arr.reduce((result, value) => {
    let a = path.join(__dirname, src, value);
    let b = path.join(__dirname, dest, value);
    let obj = {from: a, to: b};
    result.push(obj);
    return result;
  }, Array.from([]));
}

const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

let pathDirSrc = 'addons';
let pathDirDest = 'dist';

let entry = [
  path.join(__dirname, pathDirSrc, 'background.js'),
];
const patterns = geneFromTo(
  [
    '_locales', //
    'icons', // icon
    'js', // content-scripts
    'background.html', //
    'manifest.json', //
  ],
  pathDirSrc,
  pathDirDest,
);

//************************************************************************
//************************************************************************
//************************************************************************
//************************************************************************

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    filename: 'background.js',
    path: path.join(__dirname, pathDirDest),
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: patterns,
    }),
  ],
};

