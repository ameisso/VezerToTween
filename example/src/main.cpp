#include "main.h"

void setup()
{
  delay(2000);
  Serial.begin(115200);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(DMX_LEARN_PIN, INPUT_PULLUP);
  digitalWrite(RELAY_PIN, HIGH);
  SAMD21DMX.setDirectionPin(DIRECTION_PIN);
  SAMD21DMX.startOutput();

  setupWarm();
  setupCold();
}

void loop()
{
  printValues();
  warmTimeline.update();
  coldTimeline.update();
  SAMD21DMX.setSlot(1, warmTarget);
  SAMD21DMX.setSlot(2, coldTarget);
}

void printValues()
{
  Serial.print("[");
  Serial.print(warmTarget);
  Serial.print(", ");
  Serial.print(coldTarget);
  Serial.println("]");
}