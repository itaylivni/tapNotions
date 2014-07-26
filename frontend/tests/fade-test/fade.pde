int radius = 50;
int cx = 10;
int cy = 10;
PImage bg;
int[] pic = new int[50394];
int[] cov = new int[50394];
bool loaded = false;
void setup(){
    bg = loadImage("download.jpg");
    size(227,222);
    stroke(0);
}
void draw(){
    if ( loaded == false ){
	background(bg);
	loadPixels();
	arrayCopy(pixels,pic);
	loaded = true;
	background(120);
	loadPixels();
	arrayCopy(pixels,cov);
    }
    else {
	loadPixels();
	for (int i = 0, n = pic.length; i < n; i++ ){
	    pixels[i] = cov[i];
	}
	updatePixels();
    }
    stroke(0,255,0);
    fill(0,0,0,0);
    ellipse(cx,cy,radius,radius);
}
void mouseMoved(){
    cx = mouseX;
    cy = mouseY;
}
void mouseClicked(){
    int xc = mouseX;
    int yc = mouseY;
    int x = xc-radius;
    int y = yc-radius;
    int i = x+(y*width);
    x = xc+radius;
    y = yc+radius;
    int n = x+(y*width);
    for (i; i < n; i++){
	x = i % width;
	y = i / width;
	if ( dist(x,y,xc,yc) < radius/2 )
	    cov[i] = pic[i];
    }
}
