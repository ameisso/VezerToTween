console.log("\n---------------------\n this files loads a vezer composition and converts each tracks to Tween code\n---------------------\n\n\n");

const { time } = require('console');
var fs = require('fs');
const xml = require("xml-parse");
const filePath = 'Untitled.xml'
const outputPath = "";
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


    var previousTime = 0;
    var isFirstKeyframe = true;
    tracks.forEach((track) => {

        var trackType = track.getElementsByTagName("type")[0].innerXML;
        if (trackType == "OSCValue/float" || trackType == "MidiCCValue" || trackType == "MidiNotes" || trackType == "ArtNetValue" || trackType == "OSCValue/int") {

            var trackName = track.getElementsByTagName("name")[0].innerXML;
            trackName = trackName.replace(/\s/g, '');//remove spaces
            trackName = trackName[0].toLowerCase() + trackName.substring(1);
            var timelineName = trackName + "Timeline";
            var variableName = trackName + "Target";
            var outputFileName = outputPath + trackName + ".h";
            var keyframes = track.getElementsByTagName("keyframes");
            var keyframesArray = keyframes[0].getElementsByTagName("keyframe");

            var tweenString = "//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) \n";
            tweenString += "Tween::Timeline " + timelineName + ";\n"

            if (trackType == "OSCValue/float") {
                tweenString += "float " + variableName + ";\n\n"
            }
            else {
                tweenString += "int " + variableName + ";\n\n"
            }
            tweenString += "inline void setup" + trackName[0].toUpperCase() + trackName.substring(1) + "()\n{\n"
            tweenString += "    " + timelineName;
            if (isLooping == 'on') {
                tweenString += ".mode(Tween::Mode::REPEAT_TL);"
            }
            else {
                tweenString += ".mode(Tween::Mode::ONCE);"
            }

            tweenString += "\n    //" + timelineName + ".start();\n    " + timelineName + ".add(" + variableName + ")\n"

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
                var deltaMs = Number(((timeSeconds - previousTime) * 1000).toFixed(0));
                if (deltaMs < 0) {

                    deltaMs = 0;
                }
                previousTime = timeSeconds;
                if (isFirstKeyframe && time != 0) {
                    isFirstKeyframe = false;
                    if (time != 0) {
                        tweenString += "        .init(" + value + ")\n";
                        tweenString += "        .offset(" + deltaMs + ") //" + Number((timeSeconds).toFixed(1)) + "s\n";
                    }
                }
                else {
                    isFirstKeyframe = false;
                    if (type == "none") {
                        tweenString += "        .hold(" + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                    }
                    else {
                        tweenString += "        .then" + tweenType + "(" + value + "," + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                    }
                }
            });
            fs.writeFile(outputFileName, "\n" + tweenString + ";\n}", function (err) {
                if (err) throw err;
            });
        }
        else if (trackType == "ArtNetColor/RGBW") {

            var trackName = track.getElementsByTagName("name")[0].innerXML;
            trackName = trackName.replace(/\s/g, '');//remove spaces
            trackName = trackName[0].toLowerCase() + trackName.substring(1);
            var timelineNameR = trackName + "Timeline_R";
            var timelineNameG = trackName + "Timeline_G";
            var timelineNameB = trackName + "Timeline_B";
            var timelineNameW = trackName + "Timeline_W";
            var variableNameR = trackName + "TargetR";
            var variableNameG = trackName + "TargetG";
            var variableNameB = trackName + "TargetB";
            var variableNameW = trackName + "TargetW";
            var outputFileName = outputPath + trackName + ".h";

            var tweenString = "//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) \n\n";
            tweenString += "Tween::Timeline " + timelineNameR + ";\n";
            tweenString += "Tween::Timeline " + timelineNameG + ";\n";
            tweenString += "Tween::Timeline " + timelineNameB + ";\n";
            tweenString += "Tween::Timeline " + timelineNameW + ";\n";

            tweenString += "\nint " + variableNameR + ";\n"
            tweenString += "int " + variableNameG + ";\n"
            tweenString += "int " + variableNameB + ";\n"
            tweenString += "int " + variableNameW + ";\n"


            tweenString += "\n\ninline void setup" + trackName[0].toUpperCase() + trackName.substring(1) + "()\n{\n"
            var redString = "    " + timelineNameR;
            var greenString = "    " + timelineNameG;
            var blueString = "    " + timelineNameB;
            var whiteString = "    " + timelineNameW;
            if (isLooping == 'on') {
                redString += ".mode(Tween::Mode::REPEAT_TL);"
                greenString += ".mode(Tween::Mode::REPEAT_TL);"
                blueString += ".mode(Tween::Mode::REPEAT_TL);"
                whiteString += ".mode(Tween::Mode::REPEAT_TL);"
            }
            else {
                redString += ".mode(Tween::Mode::ONCE);"
                greenString += ".mode(Tween::Mode::ONCE);"
                blueString += ".mode(Tween::Mode::ONCE);"
                whiteString += ".mode(Tween::Mode::ONCE);"
            }

            var keyframes = track.getElementsByTagName("keyframes");
            var keyframesArray = keyframes[0].getElementsByTagName("keyframe");

            redString += "\n    //" + timelineNameR + ".start();\n    " + timelineNameR + ".add(" + variableNameR + ")\n"
            greenString += "\n    //" + timelineNameG + ".start();\n    " + timelineNameG + ".add(" + variableNameG + ")\n"
            blueString += "\n    //" + timelineNameB + ".start();\n    " + timelineNameB + ".add(" + variableNameB + ")\n"
            whiteString += "\n    //" + timelineNameW + ".start();\n    " + timelineNameW + ".add(" + variableNameW + ")\n"

            isFirstKeyframe = true;
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
                var deltaMs = Number(((timeSeconds - previousTime) * 1000).toFixed(0));
                if (deltaMs < 0) {

                    deltaMs = 0;
                }
                previousTime = timeSeconds;
                if (isFirstKeyframe && time != 0) {
                    isFirstKeyframe = false;
                    if (time != 0) {
                        const splitted  = value.split(",");
                        redString += "        .init(" + splitted.at(0) + ")\n";
                        redString += "        .offset(" + deltaMs + ") //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        greenString += "        .init(" + splitted.at(1) + ")\n";
                        greenString += "        .offset(" + deltaMs + ") //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        blueString += "        .init(" + splitted.at(2) + ")\n";
                        blueString += "        .offset(" + deltaMs + ") //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        whiteString += "        .init(" + splitted.at(3) + ")\n";
                        whiteString += "        .offset(" + deltaMs + ") //" + Number((timeSeconds).toFixed(1)) + "s\n";
                    }
                }
                else { 
                    isFirstKeyframe = false;
                    if (type == "none") {
                        redString += "        .hold(" + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        greenString += "        .hold(" + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        blueString += "        .hold(" + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        whiteString += "        .hold(" + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                    }
                    else {

                        const splitted = value.split(",");
                        redString += "        .then" + tweenType + "(" + splitted.at(0) + "," + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        greenString += "        .then" + tweenType + "(" + splitted.at(1) + "," + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        blueString += "        .then" + tweenType + "(" + splitted.at(2) + "," + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";
                        whiteString += "        .then" + tweenType + "(" + splitted.at(3) + "," + deltaMs + ",[]() {}) //" + Number((timeSeconds).toFixed(1)) + "s\n";

                    }
                }
            });

            redString += ";\n";
            greenString += ";\n";
            blueString += ";\n";
            whiteString += ";\n";
            fs.writeFile(outputFileName, "\n" + tweenString + "\n" + redString + greenString + blueString + whiteString + "\n}", function (err) {
                if (err) throw err;
            });
        }
        else if (trackType == "ArtNetColor/RGB") {

        }
        else {
            console.log("unsuported track type " + trackType);
        }
    });
});

function getTweenEasingName(vezerName) {
    if (vezerName == "none") {
        //warning none is suported separatly (with .hold()
        return null;
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