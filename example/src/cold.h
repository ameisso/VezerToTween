
//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) 
Tween::Timeline coldTimeline;
int coldTarget;

inline void setupCold()
{
    coldTimeline.mode(Tween::Mode::REPEAT_TL);
    coldTimeline.start();
    coldTimeline.add(coldTarget)
        .then<Ease::Quad>(30,0,[]() {}) //0s
        .then<Ease::Quad>(100,4033,[]() {}) //4s
        .then<Ease::Quad>(48,5733,[]() {}) //9.8s
;
}