#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://lit-atoll-3007.herokuapp.com";
var pagedata;
var assertURLExists = function(inurl) {
    var instr = inurl;
    if(instr.length<5) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
   }
   
  
return instr;
};
 

var assertFileExists = function(infile) {
    var instr = infile.toString();
        if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    
    return instr;
};


var cheerioHtmlFile = function(htmlfile) {
    console.log ("in cheerioHTMLFile");
    return cheerio.load(fs.readFileSync(htmlfile));
    
};

var cheerioURL = function(url){
    console.log ("in function cheerioURL, URL is " + url);
   rest.get(url).on('complete',function(result) {
       console.log ("completed getting page", + result);	    
//       return cheerio.load(result);
   });
       
};
var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkUrl = function(checksfile,url) {
  console.log ("in function checkURL , URL is " + url);
    cheerioURL(url);
//var checks = loadChecks(checksfile).sort();
   //var out = {};
   //for(var ii in checks) {
    //   var present = $(checks[ii]).length > 0;
     //   out[checks[ii]] = present;
    //}
   // return out;
};


var checkHtmlFile = function(checksfile,htmlfile) {
    $ = cheerioHtmlFile(htmlfile);
   var checks = loadChecks(checksfile).sort();
   var out = {};
   for(var ii in checks) {
       var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
      .option('-u,  --url <URL>','URL string', clone(assertURLExists), URL_DEFAULT)       
      .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
      .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT )
      .parse(process.argv);
    //var checkJson = checkHtmlFile(program.checks,program.file);
    var checkJson = checkUrl(program.checks, program.url);
    console.log("Finished going through checkUrl function ");
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log("outJson is " + outJson);
    
}
else {
    exports.checkHtmlFile = checkHtmlFile;
}

