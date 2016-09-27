"use strict";
let makeRequest = require("request");
let express = require('express');
let app = express();
let httpServer = require('http').createServer(app);
let io = require('socket.io')(httpServer);
let url = require("url");
let ejs = require('ejs');
let fs = require('fs');
let parseSearchResult = require("./ebayjsonconverter").parseSearchResult;
let template = ejs.compile(fs.readFileSync(`${__dirname}/views/partials/nadabid.ejs`, 'utf8'));
//??
//app.use(express.json());
io.on('connection', (client)=>{
  client.on('search', (data)=>{
    if (data) {
      let options = {
        protocol: "http",
        host: "svcs.ebay.com",
        pathname: "/services/search/FindingService/v1",
        query: {
          "OPERATION-NAME" : "findItemsByKeywords",
          "SERVICE-VERSION" : "1.13.0",
          "SECURITY-APPNAME" : "AaronTra-nadabid-PRD-52f530923-60b78778",
          "RESPONSE-DATA-FORMAT" : "json",
          "REST-PAYLOAD" : true,
          "itemFilter(0).name" : "MaxBids",
          "itemFilter(0).value" : "0",
          "sortOrder" : "EndTimeSoonest",
          "affiliate.networkId" : 9,
          "affiliate.trackingId" : 5336112370,
          "keywords" : data
        }
      }
      let ebayUrl = url.format(options);
      //console.log(ebayUrl);
      makeRequest(ebayUrl, (err,req,body)=>{
        //if (client.readyState === OPEN){
        //  client.write(parseSearchResult(JSON.parse(body)));
        //}
        //console.log(parseSearchResult(JSON.parse(body)));
        //response.locals = {items:parseSearchResult(JSON.parse(body)), search:search};
        //response.locals = {results:results["searchResult"], search:search};
        //let content = response.render('./partials/nadabid.ejs', {data: parseSearchResult(JSON.parse(body)), filename});
        let content = template({items: parseSearchResult(JSON.parse(body))});
        client.emit('search-response',content);
        //let render = ejs.render(template,{items: parseSearchResult(JSON.parse(body))});
        //console.log(content.toString());
      });
    }
  });
});

app.use(express.static(__dirname + '/assets'));

app.get("/", (request, response) => {
  if (!request.query.search) {
    response.locals = {items:null, search:null};
    response.render('./pages/index.ejs');
  } else {
    let options = {
      protocol: "http",
      host: "svcs.ebay.com",
      pathname: "/services/search/FindingService/v1",
      query: {
        "OPERATION-NAME" : "findItemsByKeywords",
        "SERVICE-VERSION" : "1.13.0",
        "SECURITY-APPNAME" : "AaronTra-nadabid-PRD-52f530923-60b78778",
        "RESPONSE-DATA-FORMAT" : "json",
        "REST-PAYLOAD" : true,
        "itemFilter(0).name" : "MaxBids",
        "itemFilter(0).value" : "0",
        "sortOrder" : "EndTimeSoonest",
        "affiliate.networkId" : 9,
        "affiliate.trackingId" : 5336112370,
        "keywords" : request.query.search
      }
    }
    let ebayUrl = url.format(options);
    //console.log(ebayUrl);
    makeRequest(ebayUrl, (err,req,body)=>{
      response.locals = {items:parseSearchResult(JSON.parse(body)), search:request.query.search};
      response.render('./pages/index.ejs');
    });
  }
});

app.get('/api', (request,response)=>{
  response.render('./pages/api.ejs');
});

app.get("/api/v0.1/finditems/:search", (request,response)=>{
  let search = request.params.search;
  let options = {
    protocol: "http",
    host: "svcs.ebay.com",
    pathname: "/services/search/FindingService/v1",
    query: {
      "OPERATION-NAME" : "findItemsByKeywords",
      "SERVICE-VERSION" : "1.13.0",
      "SECURITY-APPNAME" : "AaronTra-nadabid-PRD-52f530923-60b78778",
      "RESPONSE-DATA-FORMAT" : "json",
      "REST-PAYLOAD" : true,
      "itemFilter(0).name" : "MaxBids",
      "itemFilter(0).value" : "0",
      "sortOrder" : "EndTimeSoonest",
      "affiliate.networkId" : 9,
      "affiliate.trackingId" : 5336112370,
      "keywords" : search
    }
  }
  let ebayUrl = url.format(options);
  //console.log(ebayUrl);
  makeRequest(ebayUrl, (err,req,body)=>{
    response.type('json');
    response.send({items:parseSearchResult(JSON.parse(body)), search:search});
  });
});
httpServer.listen(process.env.PORT || 5000);
//httpServer.listen(process.env.PORT || 5000 , '0.0.0.0'); FOR DEBUG
