
//Tween Timeline generated automatically (https://github.com/ameisso/VezerToTween) 
Tween::Timeline warmTimeline;
int warmTarget;

inline void setupWarm()
{
    warmTimeline.mode(Tween::Mode::REPEAT_TL);
    warmTimeline.start();
    warmTimeline.add(warmTarget)
        .then<Ease::Quad>(0,0,[]() {}) //0s
        .then<Ease::Quad>(176,2600,[]() {}) //2.6s
        .then<Ease::Quad>(86,3300,[]() {}) //5.9s
        .then<Ease::Quad>(219,2167,[]() {}) //8.1s
        .then<Ease::Quad>(31,800,[]() {}) //8.9s
        .then<Ease::Quad>(184,1133,[]() {}) //10s
;
}