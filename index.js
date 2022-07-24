console.log("\n---------------------\n this files loads a vezer composition and converts each tracks to Tween code\n---------------------\n\n\n");

var fs = require('fs');
const xml = require("xml-parse");
const filePath = 'Untitled.xml'
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    var parsedXML = xml.parse(data);
    var xmlDoc = new xml.DOM(parsedXML);
    var root = xmlDoc.document;
    var tracks = root.getElementsByTagName('track');
    var fps = root.getElementsByTagName('fps')[0].innerXML;
    var isLooping = root.getElementsByTagName('loop')[0].innerXML;

    tracks.forEach((track) => {

        var trackType = track.getElementsByTagName("type")[0].innerXML;
        if (trackType == "OSCValue/float" || trackType == "MidiCCValue" || trackType == "MidiNotes" || trackType == "ArtNetValue" || trackType == "OSCValue/int") {

            var trackName = track.getElementsByTagName("name")[0].innerXML;
            trackName = trackName.replace(/\s/g, '');//remove spaces
            trackName = trackName[0].toLowerCase() + trackName.substring(1);
            var timelineName = trackName + "Timeline";
            var variableName = trackName + "target";
            var outputFileName = trackName + ".h";
            var keyframes = track.getElementsByTagName("keyframes");
            var keyframesArray = keyframes[0].getElementsByTagName("keyframe");

            var tweenString = "//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) \n";
            tweenString += "Tween::Timeline " + timelineName + ";\n"
            tweenString += "int " + variableName + ";\n\n"

            tweenString += "inline void setup" + trackName[0].toUpperCase() + trackName.substring(1) + "()\n{\n"

            tweenString += "    " + timelineName;
            console.log('isLooping ' + isLooping)
            if (isLooping == 'on') {
                tweenString += ".mode(Tween::Mode::REPEAT_TL);"
            }
            else {
                tweenString += ".mode(Tween::Mode::ONCE);"
            }

            tweenString += "\n    " + timelineName + ".start();\n         " + timelineName + ".add(" + variableName + ")\n"

            keyframesArray.forEach((item) => {
                var time = 0;
                var value = 0;
                var type = '';
                var tweenType = '';
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
                    tweenType = getTweenEasingName(type);
                });
                var timeSeconds = time / fps;
                var timeMs = Math.round(timeSeconds * 1000);
                // console.log("[" + timeSeconds + "] " + value + " " + type)
                // console.log("-----")
                // tweenString += ".then<Ease::Sine>(" + value + "," + timeMs + ",[]() {})\n";
                tweenString += "        .then" + tweenType + "(" + value + "," + timeMs + ",[]() {})\n";
            });


            fs.writeFile(outputFileName, "\n" + tweenString + ";\n}", function (err) {
                if (err) throw err;
            });
        }
        else {
            console.log("unsuported track type " + trackType);
        }
    });
});

function getTweenEasingName(vezerName) {
    if (vezerName == "none") {
        //warning none should be an offet 
        return "";
    }
    else if (vezerName == "linear") {
        return "";
    }
    else if (vezerName == "quadratic-in-out") {
        return "<Ease::Quad>"
    }
    else if (vezerName == "cubic-in-out") {
        return "<Ease::Cubic>"
    }
    else if (vezerName == "quartic-in-out") {
        return "<Ease::Quart>"
    }
    else if (vezerName == "quintic-in-out") {
        return "<Ease::Quint>"
    }
    else if (vezerName == "sine-in-out") {
        return "<Ease::Sine>"
    }
    else if (vezerName == "circular-in-out") {
        return "<Ease::Circ>"
    }
    else if (vezerName == "exponential-in-out") {
        return "<Ease::Expo>"
    }
    else if (vezerName == "elastic-in-out") {
        return "<Ease::Elastic>"
    }
    else if (vezerName == "back-in-out") {
        return "<Ease::Back>"
    }
    else if (vezerName == "bounce-in-out") {
        return "<Ease::Bounce>"
    }//INs
    else if (vezerName == "quadratic-in") {
        return "<Ease::QuadIn>"
    }
    else if (vezerName == "cubic-in") {
        return "<Ease::CubicIn>"
    }
    else if (vezerName == "quartic-in") {
        return "<Ease::QuartIn>"
    }
    else if (vezerName == "quintic-in") {
        return "<Ease::QuintIn>"
    }
    else if (vezerName == "sine-in") {
        return "<Ease::SineIn>"
    }
    else if (vezerName == "circular-in") {
        return "<Ease::CircIn>"
    }
    else if (vezerName == "exponential-in") {
        return "<Ease::ExpoIn>"
    }
    else if (vezerName == "elastic-in") {
        return "<Ease::ElasticIn>"
    }
    else if (vezerName == "back-in") {
        return "<Ease::BackIn>"
    }
    else if (vezerName == "bounce-in") {
        return "<Ease::BounceIn>"
    }//Outs
    else if (vezerName == "quadratic-out") {
        return "<Ease::QuadOut>"
    }
    else if (vezerName == "cubic-out") {
        return "<Ease::CubicOut>"
    }
    else if (vezerName == "quartic-out") {
        return "<Ease::QuartOut>"
    }
    else if (vezerName == "quintic-out") {
        return "<Ease::QuintOut>"
    }
    else if (vezerName == "sine-out") {
        return "<Ease::SineOut>"
    }
    else if (vezerName == "circular-out") {
        return "<Ease::CircOut>"
    }
    else if (vezerName == "exponential-out") {
        return "<Ease::ExpoOut>"
    }
    else if (vezerName == "elastic-out") {
        return "<Ease::ElasticOut>"
    }
    else if (vezerName == "back-out") {
        return "<Ease::BackOut>"
    }
    else if (vezerName == "bounce-out") {
        return "<Ease::BounceOut>"
    }
    else {
        console.log("unknown type " + vezerName);
        return "<Ease::Quad>"
    }
}