var resultsFileName = "D_MEGA.HTM";
var fileURL = "http://www1.caixa.gov.br/loterias/_arquivos/loterias/D_megase.zip";

var request = require("request");
var rp = require("request-promise-native");
var unzip = require("unzip");

var fs = require("fs");
const $ = require("cheerio");

var items = [];

//request(fileURL).pipe(fs.createWriteStream("D_megase2.zip"),);
//_pk_id.4.968f=8d9570f99416a654.1506521940.10.1507666431.1507663374.; _pk_ref.4.968f=%5B%22%22%2C%22%22%2C1507666431%2C%22https%3A%2F%2Fduckduckgo.com%2F%22%5D; _ga=GA1.3.1298439688.1507233223; _pk_ses.4.968f=*
var cookiejar = rp.jar();
var options = {
  uri:fileURL,
  jar:cookiejar
};
/*
rp(options)
  .then(function(response){
    console.log(response.statusCode);
    console.log(response.headers['content-type']);
  })
  .pipe(fs.createReadStream())
  
  .on("entry", function (entry){
    var fileName = entry.path;
    var type = entry.type; // 'Directory' or 'File' 
    var size = entry.size;
    if (fileName === resultsFileName) {
      entry.pipe(fs.createWriteStream(resultsFileName));
    } else {
      entry.autodrain();
    }
  
  });
*/

request
.get(fileURL,{jar:true})
.on('response', function(response) {
  console.log(response.statusCode) // 200
  console.log(response.headers['content-type']) // 'image/png'
})
.pipe(fs.createReadStream())
.pipe(unzip.Parse())
.on("entry", function (entry){
  var fileName = entry.path;
  var type = entry.type; // 'Directory' or 'File' 
  var size = entry.size;
  console.log(type);
  if (fileName === resultsFileName) {
    entry.pipe(console.log());
  } else {
    entry.autodrain();
  }

});



/*
fs.readFile(fileName, "utf8", function(error, data) {
  const dom = $.load(data);

  dom('tr').slice(1,3).each(function(index){
       let arr = $( this ).find('td').slice(0,8).toArray();
       let item = {
         concurso:$(arr[0]).text(),
         data:$(arr[1]).text(),
         um:$(arr[2]).text(),
         dois:$(arr[3]).text(),
         tres:$(arr[4]).text(),
         quatro:$(arr[5]).text(),
         cinco:$(arr[6]).text(),
         seis:$(arr[7]).text()
       };
       items.push(item);

  });
  console.log(items);
});

console.log(items);
items.forEach(function(item,index){
    console.log(item);
});
*/


