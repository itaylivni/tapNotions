void setup(){
    size(500,500);

    // Create the text
    textFont(createFont("Sans",240));
    
    noStroke();
    int x = 100;
    int y = 200;
    fill(0);

    text("e",x,y);

    int height = (textAscent()+textDescent());
    // Create bounding box
    fill(#ffffff,0);
    stroke(255);
    rect(x,y-textAscent(),textWidth("e"),height);

    lowercase_e e = new lowercase_e(textWidth("e"),textAscent()+textDescent(),
				    x,y,color(0),width);
}
