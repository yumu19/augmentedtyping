var http = require('http');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dataSchema = new Schema({ data: Schema.Types.Mixed});
var Data = mongoose.model('directyping', dataSchema);
mongoose.connect('mongodb://localhost/test');

http.createServer(function (req, res) {
  if(req.method=='POST') {
    var body = '';
    req.on('data', function (dat) {
      body +=dat;
    });
    req.on('end',function(){
      var doc = new Data({ data: JSON.parse(body) });
      doc.save(function(err){
        if(err) {
          console.log(err);
        } else {
          console.log(body);
        }
      });
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
      res.end('{"result":"ok"}');
    });
  }
}).listen(1337, "localhost");
