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
   // if(instr.length<10) {
     //   console.log("%s does not exist. Exiting.", instr);
       // process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    //}
      //pagedata=rest.get(inurl);
  
return instr;
};
 

var assertFileExists = function(infile) {
    var instr = infile.toString();
        if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    var rawhtml=fs.readFileSync(instr);
    return instr;
};


var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
    
};

    rest.get(url).on('complete',function(data) {
sys.puts(data[0].pagedata);
});

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(
checksfile, url) {
    //$= cheerioHtmlFile(htmlfile);
    $ = pagedata(url);
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
    var checkJson = checkHtmlFile( program.checks, program.url) ;
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
//    console.log(program.url);
}
else {
    exports.checkHtmlFile = checkHtmlFile;
}
