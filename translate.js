/*
  CMD LINE: node translate.js [language to convert to]
*/

var fs            = require('fs');
var converter     = require('excel-as-json').processFile;
var englishJSON   = './en-US.json';
var excelSheet    = './excel.xlsx';
var fromLanguage  = 'English';
var toLanguage   = process.argv[2];
var languages     = [
  'Russian',
  'German',
  'Dutch'
];

if(!toLanguage || languages.indexOf(toLanguage) === -1) {
  console.log('ERROR: must pass in supported language to translate to. (' + languages + ')');
  process.exit(1);
}

converter(excelSheet, null, null,  function(err, data) {
  if (err) throw err;

  fs.readFile(englishJSON, 'utf8', function (e, d) {
    if (err) return console.log(err);

    var result = d;
    data.forEach(function(element) {
      if(!element[fromLanguage]) return;

      try {
        result = result.replace(element[fromLanguage], element[toLanguage]);
      } catch(e) {};
    });

    fs.writeFile('./translated/translated-' + toLanguage + '.json', result, 'utf8', function (err) {
       if (err) return console.log(err);
    });
  });
});
