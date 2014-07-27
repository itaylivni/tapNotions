class lowercase_e extends Map {
    int startX, startY;

    lowercase_e(int w, int h, int x, int y, color col, int displayWidth){
	super(w,h,x,y,col,displayWidth);
    }
    void findEnd(){
	startX = letterPos[0]+(letterWidth/2);
	startY = letterPos[1];
	pixels[startY*width+startX] = color(#ff0000);
    }
}
