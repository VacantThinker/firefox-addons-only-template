const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

let entry = path.join(__dirname, 'addons', 'background.js');
const patterns = geneFromTo(
  [
    '_locales', //
    'icons', // icon
    'js', // content-scripts
    'background.html', //
    // 'dexie.js', //
    // 'LICENSE', //
    'manifest.json', //
  ],
  'addons',
  'dist',
);

//************************************************************************
//************************************************************************
//************************************************************************
//************************************************************************

module.exports = {
  // mode: 'development', // production
  mode: 'production', // production
  entry: entry,
  output: {
    filename: 'background.js',
    path: path.join(__dirname, 'dist'),
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

/**
 *
 * @param arr{Array} src file/dir arr
 * @param src{String} src path
 * @param dest{String} dest path
 * @return Array
 */
function geneFromTo(arr, src, dest) {
  return arr.reduce((result, value) => {
    let a = path.join(__dirname, src, value);
    let b = path.join(__dirname, dest, value);
    let obj = {from: a, to: b};
    result.push(obj);
    return result;
  }, Array.from([]));
}
