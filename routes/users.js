var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var request = require('superagent');

var url = 'http://frps.eflora.cn/v/1';
var links = [], wiki = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  request.get(url)
      .end(function(err,res){
        if(err){
          console.log(err);
        }else{
          var $=cheerio.load(res.text);

          var data = $('div.divmain');
          console.log(data.html());

          var linkList = $('div[style="float:left;margin-right:5px;"] a');
          linkList.map(function(i, link){
            links.push('http://frps.eflora.cn/getfam.ashx?t='+$(link).attr('href').substring(3));

            request.get('http://frps.eflora.cn/getfam.ashx?t='+$(link).attr('href').substring(3))
                .end(function(error, response){
                  if(error) console.error(error);
                  else{
                    var $$ = cheerio.load(response.text);
                    //console.log($$.html());
                      //wiki.push();
                  }
                });
          });
          console.log("已抓取成功"+links.length+"链接");
          console.log(links);

           //getIAjaxUrlList(20);
        }
      });

  res.send('respond with a resource');
});

module.exports = router;
