#include "main.h"

void setup()
{
  delay(2000);
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(DMX_LEARN_PIN, INPUT_PULLUP);
  digitalWrite(RELAY_PIN, HIGH);

  setupColor();
}

void loop()
{
  printValues();
  colorTimeline_R.update();
  colorTimeline_G.update();
  colorTimeline_B.update();
  colorTimeline_W.update();
}

void printValues()
{
  Serial.print("[");
  Serial.print(colorTargetR);
  Serial.println("]");
}