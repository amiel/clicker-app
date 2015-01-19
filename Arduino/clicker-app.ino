
int ledPin = 1;

void setup() {                
  // If prompted for a pairing code it is 1234, 12345, or 000000
  pinMode(ledPin, OUTPUT);  
  Serial.begin(9600);
  
  Serial.write("AT+NAMEclickerapp");
}

void loop() {
  blink(50, 50);
  Serial.write("C");
  delay(2000);
}

void blink(int onFor, int offFor) {
  digitalWrite(ledPin, HIGH);
  delay(onFor);
  digitalWrite(ledPin, LOW);
  delay(offFor);
};

