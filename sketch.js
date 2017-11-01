var radius = 150;
var myImg, mySong, analyzer;

function preload() {
    mySong = loadSound('./Swingrowers-ThatsRight.mp3');
    myImg = loadImage("./gramophone.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySong.play();
  fft = new p5.FFT();
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(41, 10, 10);
  translate(width/2, height/2);
  //rotate(frameCount/60);
  var lat; 
  var volume = analyzer.getLevel();
  var colRange=volume*500;
  
  
  var spectrum = fft.analyze();
  noStroke();
  for (var p = 0; p< spectrum.length; p++){
    var l = map(p, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[p], 0, 255, height, 0);
    fill(62, 15, 15);
    ellipse(cos(p)*h*4,sin(p)*l, 10,10);
    fill(82, 20, 20);
    ellipse(cos(p)*h*2,sin(p)*l, 7,7);
    fill(103, 25, 25);
    ellipse(cos(p)*h,sin(p)*l, 5,5);
    }
  
  fill(colRange, colRange-100, colRange-100);
  for( lat = -90; lat < 90; lat+=10)
  {
    for( lng = -180; lng < 180; lng+=10)
    {
      var _lat = radians(lat);  
      var _lng = radians(lng);  
      var multiplier = volume*5;
      
      var x = (radius*multiplier) * cos(_lat) * cos(_lng);
      var y = (radius*multiplier) * sin(_lat) * (-1);
      var z = (radius*multiplier) * cos(_lat) * sin(_lng);
      noStroke();
      
      ellipse(x,y,4,4);
    }
  }
  
  var range = volume*750;
  
  for (var i=0; i<30; i++){
  fill(204, 102, 102);
  ellipse(cos(i)*range,sin(i)*range, 20,20);
  }
  
  for (var y=0; y<20; y++){
  fill(217, 140, 140);
  ellipse(cos(y)*(range/2),sin(y)*(range/2), 10,10);
  }
  
  ellipse(0,0,volume*100,volume*100);
  image(myImg, (width/3), (height/3), height/10, height/10);
  textSize(height/22);
  textFont('Proxima Nova Extrabold');
  text("That's Right!", (width/2.7)+20, (height/2.65));
  textFont('Proxima Nova');
  text("Swingrowers", (width/2.7)+20, (height/2.35));

  /*if (random()<=0.1){
    fill(255, 102, 102);
    ellipse(frameCount*3,50,20,20);
  } */

}