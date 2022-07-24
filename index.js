console.log("\n---------------------\n this files loads a vezer composition and converts each tracks to Tween code\n---------------------\n\n\n");

var fs = require('fs');
const xml = require("xml-parse");
var outputFileName = "timeline.h"


fs.readFile('Untitled.xml', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    var parsedXML = xml.parse(data);
    var xmlDoc = new xml.DOM(parsedXML);
    var root = xmlDoc.document;
    var tracks = root.getElementsByTagName('track')
    var fpsObject = root.getElementsByTagName('fps');
    var fps = fpsObject[0].innerXML;
    var keyframes = tracks[0].getElementsByTagName("keyframes");
    var keyframesArray = keyframes[0].getElementsByTagName("keyframe");

    fs.truncate(outputFileName, 0, function () { console.log('done') })
    fs.writeFile(outputFileName, '//Tween Timeline generated automatically', function (err) {
        if (err) throw err;
    });


    //INIT TIMELINE 
    fs.appendFile(outputFileName, "\nTween::Timeline timeline;       // create timeline\ntimeline.mode(Tween::Mode::REPEAT_TL);\ntimeline.start();\ntimeline.add(target)            // add sequence to timeline"
        , function (err) {
            if (err) throw err;
            var tweenString = '';
            // console.log(keyframesArray);
            keyframesArray.forEach((item) => {

                var time = 0;
                var value = 0;
                var type = 0;
                timePoints = item.getElementsByTagName("time");
                timePoints.forEach((timepoint) => {
                    time = timepoint.innerXML;
                });
                valuePoints = item.getElementsByTagName("value");
                valuePoints.forEach((valuePoint) => {
                    value = valuePoint.innerXML;
                });

                curveTypes = item.getElementsByTagName("interpolation");
                curveTypes.forEach((curveType) => {
                    type = curveType.innerXML
                });
                var timeSeconds = time / fps;
                var timeMs = Math.round(timeSeconds * 1000);
                console.log("[" + timeSeconds + "] " + value + " " + type)
                console.log("-----")

                tweenString += ".then<Ease::Sine>(" + value + "," + timeMs + ",[]() {})\n";
            });
            fs.appendFile(outputFileName, "\n" + tweenString+";", function (err) {
                if (err) throw err;
            });
        });
});

