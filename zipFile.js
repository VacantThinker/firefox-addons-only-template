/**
 * alot. null => all dir and all file
 *
 * alot. Array
 *
 * alot. String => under the dir, all dir and all file
 *
 * zipFileName. null => rootDirName
 *
 * zipFileName. Object => {append: 'abc'} => rootDirName.concat('abc')
 *
 *
 * use endsWith() to check the file or the dir. is it match the filter?
 *
 * fileFilter. default => []
 *
 * dirFilter. default => ['.git', '.idea', 'node_modules',]
 *
 * @param alot{Array:[String] | String}
 * @param zipFileName{String | {append: String}}
 * @param appendFileFilter{Array:[String] }
 * @param appendDirFilter{Array:[String] }
 */
function zipAlotFileOrDir(
  alot = null,
  zipFileName = null,
  appendFileFilter = null,
  appendDirFilter = null,
) {

  //Step 1 - require modules
  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

  let basename = path.basename(__dirname);
  zipFileName = zipFileName === null
    ? basename
    : typeof zipFileName === 'string'
      ? zipFileName
      : basename.concat(zipFileName.append);

//Step 2 - create a file to stream archive data to
  const output = fs.createWriteStream(__dirname + `/${zipFileName}.zip`);
  const archive = archiver('zip', {
    zlib: {level: 9},
  });

//Step 3 - callbacks
  output.on('close', () => {
    console.log(`Archive finished. ${zipFileName}.zip`);
  });

  archive.on('error', (err) => {
    throw err;
  });

//Step 4 - pipe and append files
  archive.pipe(output);

  // search filr or dir from alot,
  // append them to zipFile => zipFileName.zip
  function handleArrAlot() {
    alot = alot ? alot : fs.readdirSync(path.join(__dirname));

    // collect all file
    if (Array.isArray(alot)) {
      let arr = Array.from(alot);
      let reduceArr = arr.reduce((collectArr, value) => {
        let pathEntry = path.join(__dirname, value);
        if (fs.existsSync(pathEntry)) {
          let arrResult = loopSearch(pathEntry, []);
          collectArr.push(...arrResult);
        }
        return collectArr;
      }, []);
      // foreach append file; name: filename, prefix
      Array.from(reduceArr).forEach((value) => {
        let strpath = String(value).replace(__dirname, '');

        let endFilename = strpath.lastIndexOf('\\');
        let filename = strpath.substring(endFilename + 1, strpath.length);

        let prefix = strpath.replace(filename, '');
        console.log(`prefix= ${prefix}\nfilename= ${filename}\n`);
        archive.append(fs.readFileSync(String(value)),
          {name: filename, prefix});
      });

    }
    else if (typeof alot === 'string') {
      let arr = Array.from(fs.readdirSync(path.join(__dirname, alot)));
      let reduceArr = arr.reduce((collectArr, value) => {
        let pathEntry = path.join(__dirname, alot, value);
        if (fs.existsSync(pathEntry)) {
          let arrResult = loopSearch(pathEntry, []);
          collectArr.push(...arrResult);
        }
        return collectArr;
      }, []);

      // foreach append file; name: filename, prefix
      Array.from(reduceArr).forEach((value) => {
        let strpath = String(value).replace(__dirname, '');

        let endFilename = strpath.lastIndexOf('\\');
        let filename = strpath.substring(endFilename + 1, strpath.length);

        let prefix = strpath.replace(filename, '')
          .replace(`\\${alot}`, '');
        console.log(`prefix= ${prefix}\nfilename= ${filename}\n`);
        archive.append(fs.readFileSync(String(value)),
          {name: filename, prefix});
      });
    }

    // loop search all file
    function loopSearch(entry, arr) {
      const fileFilter = [];
      const dirFilter = [
        '.git', '.idea', 'node_modules',
      ];
      if (appendFileFilter) {
        fileFilter.push(...appendFileFilter);
      }
      if (appendDirFilter) {
        dirFilter.push(...appendDirFilter);
      }

      let find = [];
      if (fs.lstatSync(entry).isFile()) {
        fileFilter.filter((value) =>
          entry.endsWith(value),
        ).forEach((value) => {
          find.push(value);
        });
      }
      else {
        dirFilter.filter((value) =>
          entry.endsWith(value),
        ).forEach((value) => {
          find.push(value);
        });
      }

      if (find.length >= 1) {
        return arr;
      }
      else {
        if (fs.lstatSync(entry).isDirectory()) { // dir
          let strings = fs.readdirSync(entry);
          let reduce = strings.reduce((result, val) => {
            let pathVal = path.join(entry, val);
            let search = loopSearch(pathVal, []);
            result.push(...search);
            return result;
          }, []);
          arr.push(...reduce);
          return arr;
        }
        else { // file
          arr.push(entry);
          return arr;
        }
      }

    }

  }

  handleArrAlot();

//Step 5 - finalize
  archive.finalize().then();
}

module.exports = {
  zipAlotFileOrDir:
  zipAlotFileOrDir,

};