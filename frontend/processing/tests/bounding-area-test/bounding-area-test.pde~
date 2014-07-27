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
     textSize(80);

     text("e",50,50);
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

     if ( isOnText(col) ){
	 println("On the 'e'!");
     }
     else {
	 println("Not on 'e' :(");
     }
}
// Compares two color arrays (int[3])
bool isOnText(int[] color){
     if ( color.length != 3 ){
     	return false;
     }
     else {
	 if ( color[0] == textColor[0] ){
	     if ( color[1] == textColor[1] ){
		 if ( color[2] == textColor[2] ){
		     return true;
		 }
	     }
	 }
     }
     return false;
}
