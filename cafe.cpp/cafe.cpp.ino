const int echoPin = 3;
const int trigPin = 4;
int empty = 6;
long duration, distance;

void setup() {
  Serial.begin(9600);
  // put your setup code here, to run once:
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);

  distance = duration/58.2;

  Serial.println(distance);
  /*if(distance >= 3) {
    Serial.println("encher");//vazio
  } else {
    Serial.println("ok");  
  }*/

  delay(3000);
}
