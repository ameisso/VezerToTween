
//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) 

Tween::Timeline colorTimeline_R;
Tween::Timeline colorTimeline_G;
Tween::Timeline colorTimeline_B;
Tween::Timeline colorTimeline_W;

int colorTargetR;
int colorTargetG;
int colorTargetB;
int colorTargetW;


inline void setupColor()
{

    colorTimeline_R.mode(Tween::Mode::REPEAT_TL);
    //colorTimeline_R.start();
    colorTimeline_R.add(colorTargetR)
        .init(0)
        .offset(733) //0.7s
        .then(65535,1700,[]() {}) //2.4s
        .then(0,2567,[]() {}) //5s
        .then(0,3400,[]() {}) //8.4s
;
    colorTimeline_G.mode(Tween::Mode::REPEAT_TL);
    //colorTimeline_G.start();
    colorTimeline_G.add(colorTargetG)
        .init(0)
        .offset(733) //0.7s
        .then(0,1700,[]() {}) //2.4s
        .then(61166,2567,[]() {}) //5s
        .then(2570,3400,[]() {}) //8.4s
;
    colorTimeline_B.mode(Tween::Mode::REPEAT_TL);
    //colorTimeline_B.start();
    colorTimeline_B.add(colorTargetB)
        .init(0)
        .offset(733) //0.7s
        .then(0,1700,[]() {}) //2.4s
        .then(0,2567,[]() {}) //5s
        .then(62708,3400,[]() {}) //8.4s
;
    colorTimeline_W.mode(Tween::Mode::REPEAT_TL);
    //colorTimeline_W.start();
    colorTimeline_W.add(colorTargetW)
        .init(65535)
        .offset(733) //0.7s
        .then(0,1700,[]() {}) //2.4s
        .then(0,2567,[]() {}) //5s
        .then(0,3400,[]() {}) //8.4s
;

}