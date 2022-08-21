#include <Arduino.h>
#include <LXSAMD21DMX.h>
#include <Tween.h>
// include converted timelines : 
#include "warm.h"
#include "cold.h"

#define LED 13
#define RELAY_PIN 6
#define DIRECTION_PIN 5
#define DMX_LEARN_PIN 7

void printValues();