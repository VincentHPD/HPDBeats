#!/bin/bash
mkdir -p geojson
dirname=$(pwd)
for file in kmls/*.kml
do
    ./rename.sh $file
done
for file in kmls/*.kml
do
    file=$(basename $file)
    filename=$(basename $file .kml)
    echo "converting $file to $filename.geojson"
    ./node_modules/.bin/togeojson "$dirname/kml/$file" > "$dirname/geojson/$filename.geojson"
done

geojsonfiles=$(ls $dirname/geojson/ | grep kml | sed ':a;N;$!ba;s/\n/ /g')

./node_modules/.bin/geojson-merge $geojsonfiles $dirname/beats.geojson
