int radius = 50;
int cx = 10;
int cy = 10;
PImage bg;
int[] pic = new int[50394];
int[] cov = new int[50394];
bool loaded = false;
int[] target = new int[50394];
int fadeTime = 0.5; // seconds
int frames = 32*fadeTime;
int step[3] = new int[3];

void setup(){
    bg = loadImage("download.jpg");
    size(227,222);
    stroke(0);
    frameRate(32);
    // Initialize arrays
    for (int i = 0, n = target.length; i < n; i++ ){
	target[i] = -1;
    }
    println(frames);
}
void draw(){
    if ( loaded == false ){
	background(bg);
	loadPixels();
	arrayCopy(pixels,pic);     
	
	background(120);
	loadPixels();
	arrayCopy(pixels,cov);

	loaded = true;
    }
    else {
	for (int i = 0, n = pic.length; i < n; i++ ){
	    if ( target[i] != -1 ){
		int diff[3] = new int[3];
		diff[0] = red(target[i])-red(cov[i]);
		diff[1] = green(target[i])-green(cov[i]);
		diff[2] = blue(target[i])-blue(cov[i]);
		step[0] = diff[0]/frames;
		step[1] = diff[1]/frames;
		step[2] = diff[2]/frames;		
		
		cov[i] = color(red(cov[i])+step[0],
			       green(cov[i])+step[1],
			       blue(cov[i])+step[2]);
		pixels[i] = cov[i];
	    }
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
    int init = i;
    x = xc+radius;
    y = yc+radius;
    int n = x+(y*width);

    loadPixels();
    int display = 0;
    for (i; i < n; i++){
	x = i % width;
	y = i / width;
	if ( dist(x,y,xc,yc) < radius/2 ){
	    // Store each pixel value!
	    target[i] = color(red(pic[i]),green(pic[i]),blue(pic[i]));
	}
    }
}
