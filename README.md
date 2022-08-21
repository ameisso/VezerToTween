# VézerToTween
converts [VEZÉR](https://imimot.com/vezer/)  timelines into [Tween](https://github.com/hideakitai/Tween) timelines (to be played on arduinos) 



## Installation 
- clone this repo 
- run **npm install**
- run **npm start**

- export xml from Vezér (File -> Rendr to XML...)
- save the xml in the folder. 
- change the filePath at the begnining of the file
 	`const filePath = 'Untitled.xml'` default is "Untitled.xml"
- save the script
- vezer will export one file per track containing all the points and timings. 

## Minimal arduino code 
```C
#include <Tween.h>
#include "track1.h" // this is the file generated by the script.


void setup() {
    setupTrack1();
    track1Timeline.start();//to start the timeline;
}

void loop() {
    track1Timeline.update();
    Serial.println(track1Target); // track1Target is defined in track1.h
}
```

## Limitations :
The number of points depends on the memeory available on your controler : 
- Arduino Uno : ~15 points 
- SAMD21 : ~250 points  


## TODO : 
- code refactoring (function to access xml propoerties,)
- export cues with times and offset as comments 
- tweenduino support (and lib modification to support int)
- only exports activated timelines compositions 
- option to export all tracks from the same composition in a single file ? 
- support multiple compositions 
- support colors for neopixels 
- remap function (for exemple one led can be tested via DMX (0-255) and controled by a 12bit pwm (0-4096))
- electron app / online site 


## License
MIT