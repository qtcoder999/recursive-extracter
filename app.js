var glob = require("glob")
const makeDir = require('make-dir');
var path = require('path')
var extract = require('extract-zip')

var src = 'angular-bootstrap-nav-tree-master';

process.argv.forEach(function (val, index, array) {
    if (index >= 2) {
        listAllZipFiles(val);
    }
});

function listAllZipFiles(src) {

    glob(src + "/**/*.zip", function (er, files) {

        files.forEach(function (zipFile) {
            var directoryPath = path.dirname(zipFile) + "/" + path.parse(String(zipFile)).name;
            extractContents(zipFile, directoryPath);
        })

    })
}

function extractContents(zipFile, directoryPath) {

    let abs_zipFile = path.resolve(zipFile);
    abs_zipFile = abs_zipFile.replace(/\\/g, "/");

    let abs_directoryPath = path.resolve(directoryPath);
    abs_directoryPath = abs_directoryPath.replace(/\\/g, "/");

    makeDir(directoryPath).then(path => {
        extract(abs_zipFile, { dir: abs_directoryPath }, function (err) {
            if (err != undefined) {
                console.log(err);
            }
            listAllZipFiles(directoryPath);
        })
    });
}


