/* This page tests a theory about bounding areas: if the text has a color and that color
 * is a different color than the background color, then we can assume that when the color
 * of the pixel that the cursor has hovered over is the same as the background color, the
 * cursor is NOT on the area
 */

int width = 400;
int[] bgColor = {255,255,255};
int[] textColor = {0,0,0};

void setup(){
     size(width,400);
     strokeWeight(1);
     frameRate(32);
}

void draw(){
     // Fill the background
     background(255);

     // Draw text!!
     fill(0);
     textSize(120);

     text("TEST ING",50,100);
}

// Track mouse movements
void mouseMoved(){
     loadPixels();
     
     // Get the position of the pixel
     int pos = mouseX + (mouseY*width);
     color pix = pixels[pos];
     
     int[] col = new int[3];
     col[0] = red(pix);
     col[1] = green(pix);
     col[2] = blue(pix);

     if ( isEqual(col, bgColor) ){
	 println("Not on letter");
     }
     else {
	 println("On letter");
     }
}
bool isEqual(int[] color, int[] compare){
    int n = color.length;
    int m = compare.length;
    if ( n != m )
	return false;
    for ( int i = 0; i < n; i++ ){
	if ( color[i] != compare[i] )
	    return false;
    }
    return true;
}
