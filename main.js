var fileName = "D_MEGA.HTM";
var fs = require("fs");
const $ = require('cheerio');
var items = [];
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
