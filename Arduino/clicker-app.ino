
int ledPin = 1;
// int lowPin = 0;
int clickerPin = 2;

void setup() {                
  // If prompted for a pairing code it is 1234, 12345, or 000000
  pinMode(ledPin, OUTPUT);  
  pinMode(clickerPin, INPUT);
  digitalWrite(clickerPin, HIGH);

  Serial.begin(9600);
  
  Serial.write("AT+NAMEclickerapp");
}



int buttonPushCounter = 0;
int buttonState = 0;
int lastButtonState = 0;


void loop() {
  buttonState = digitalRead(clickerPin);

  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      // if the current state is HIGH then the button
      // went from off to on:
      buttonPushCounter++;
      Serial.write("C");
      blink(50, 50);  
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }

  lastButtonState = buttonState;
}




void blink(int onFor, int offFor) {
  digitalWrite(ledPin, HIGH);
  delay(onFor);
  digitalWrite(ledPin, LOW);
  delay(offFor);
};

