/* This page tests a theory about bounding areas: if the text has a color and that color
 * is a different color than the background color, then we can assume that when the color
 * of the pixel that the cursor has hovered over is the same as the background color, the
 * cursor is NOT on the area
 */

// Global variables

//Text
String message = "e";

//Circle
float radius = 50.0;
int X, Y;
int nX, nY;
int delay = 1;

int width = 400;
int[] bgColor = {255,255,255};
int[] textColor = {0,0,0};

void setup(){
     size(width,400);
     background(255);
     strokeWeight(1);
     frameRate(24);

     X = width / 2;
     Y = width / 2;
     nX = X;
     nY = Y;  
}

void draw(){

     if (mousePressed == true) {
          // // Draw circle pointer
          radius = radius + sin( frameCount / 4 );

          // // Track circle to new destination
          X+=(nX-X)/delay;
          Y+=(nY-Y)/delay;

          // // Set fill-color to blue
          fill( 0, 121, 184 );

          // // Set stroke-color white
          stroke(255); 

          // // Draw circle
          ellipse(mouseX, mouseY, 10, 10);

          // strokeWeight(10);
          // stroke(0, 121, 184);
          // line(mouseX, mouseY, pmouseX, pmouseY);
     }
     // Draw text!!
     fill(0, 20);
     textSize(250);

     text(message,50,200);

}

// Track mouse movements
void mouseMoved(){
     loadPixels();

     nX = mouseX;
     nY = mouseY;  
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

     // nX = mouseX;
     // nY = mouseY;  
     // String[] data = new String[4];
     // data[0] = "(";
     // data[1] = str(nX);
     // data[2] = str(nY);
     // data[3] = ")";
     // println(join(data));
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
