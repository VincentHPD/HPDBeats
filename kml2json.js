var walk = require('walk');
var tj = require('togeojson'),
    fs = require('fs'),
    jsdom = require('node-jsdom').jsdom;
var gj = require('geojson-merge');

var kml_filenames = [];
var json_filenames = [];
var json_files = [];

// Walker options
var kml_walker = walk.walk('./kmls/', {
    followLinks: false
});


kml_walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    kml_filenames.push(root + '/' + stat.name);
    next();
});

kml_walker.on('end', function() {
    kml_filenames.forEach(function(kml) {
        var kml = jsdom(fs.readFileSync(kml, 'utf8'));
        json_files.push(tj.kml(kml));
    });
    var all_geo = gj(json_files);
    fs.writeFileSync("beats.geojson", JSON.stringify(all_geo), "utf8");
});
