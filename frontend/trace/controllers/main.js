window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
// Controller
var canvas = null;
var ctx = null;
var img = new Image();
img.onload = function(){
//    ctx.drawImage(img,0,0,canvas.width,canvas.height);
}
img.src = "../../GameAssets/TN_illustrations_R00_email.jpg";

var pixelateValue = 10;
var maxPixelVal   = 0.05;
var row = 1;
var radius = 10;
var x = 0;
var y = 0;
var trace = null;
var svg;
$(document).ready(function(){
    svg = d3.select("#screen");
    // Conversions
    var scale = {};

    // Default view values
    var textSize = 4; // Em

    // Init
    var s = Snap("#screen");
    var email = new Letter(Snap("#email_text")).loadText("e-mail");

    // Set up the canvas
    
    canvas = $("#bg-image").attr({
	width:$(window).width(),
	height:$(window).height()
    })[0];

    ctx = canvas.getContext("2d");

    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    email.complete = function(){
	// Write the text on a line
	email.normalize();
	
	// Get the text's container and center it horizontally, and vertically align to the top
	var container = email.getContainer().node;
	var dim = container.getBoundingClientRect();
	$(container).attr("transform","translate("+(($(window).width()/2)-(dim.width/2))+" "+(dim.height)+")");

	$(container).find("path").attr({
	    fill : "#000",
	    "fill-opacity" : "1"
	})
	
	// Turn the "e" white
	email.attr("e",{
	    "fill"        : "#bbb",
	    "stroke"      : "#000",
	    "fill-opacity": 1,
	    "stroke-width": "20px"
	});
	var e = email.getLetter("e").el.find("path").attr("id","test");
	var epos = e.position();
	var edim = e[0].getBoundingClientRect();

	trace = $("#canvas").css({
	    position:"absolute",
	    top:epos.top+"px",
	    left:epos.left+"px",
	    "pointer-events":"none",
	    "z-index":5
	}).attr({
	    width:edim.width,
	    height:edim.height
	})[0].getContext("2d");
	
	// Set window mousemove function
	var on = false;
	var paper = email.getContainer().paper;

	// Create bounding regions
	
	// Mouseover on e
	var oldx, oldy;
	var entx, enty;
	$("#email_text g:first-child > path").on("mouseout",function(){
	    var self = $(this);
	    self.attr({
		"stroke":"#f00"
	    });
	    setTimeout(function(){
		self.attr("stroke","#000");
	    },300);
	});
	$("#screen").on({
	    "click" : function(e){
		var pos = $(this).position();
	    },
	    "mouseover" : function(e){
		if ( e.target.id == "test" ){
		    $(e.target).attr("stroke","#000");
		    oldx = entx = e.clientX-epos.left;
		    oldy = enty = e.clientY-epos.top;		    
		}
	    },
	    "mousemove" : function(e){
		if ( on == false ){
		    if ( e.target.id == "test" ){
			    var xc = e.clientX-epos.left;
			    var yc = e.clientY-epos.top;
			    trace.beginPath();
			    trace.fillStyle="#0f0";
			    trace.arc(xc,yc,5,0,Math.PI*2,true);
			    trace.fill();
			    trace.closePath();
			    oldx = xc;
			    oldy = yc;
		    }
		    else
			var color = "#888";
		    window.requestAnimationFrame(function(){
			particle(e,color?color:null);
		    });
		    on = true;
		}
		else 
		    on = false;
		e.preventDefault ? e.preventDefault() : null;
		return false;
	    }
	});
    }
});
var g = b = 0;
var r = 200;
function rgbColor(){
    var amt = 5;
    if ( r == 255 && g < 255 ){
	g+=amt;
	return "rgb(255,"+g+",0)";
    }
    else if ( r > 0 && g == 255 ){
	r-=amt;
	return "rgb("+r+",255,0)";
    }
    else if ( r == 0 && g == 255 && b < 255 ){
	b+=amt;
	return "rgb(0,255,"+b+")";
    }
    else if ( r == 0 && g > 0 && b == 255 ){
	g-=amt;
	return "rgb(0,"+g+"255)";
    }
    else if ( r < 254 && g == 0 && b == 255 ){
	r+=amt;
	return "rgb("+r+",0,0)";
    }
    else if ( r == 254 && g == 0 && b > 0 ){
	b-=amt;
	return "rgb(0,255,"+b+")";
    }
    else if ( r < 255 ){
	r+=amt;
	return "rgb("+r+",0,0)";
    }
}
var i;
function particle(e,color) {
  var m = [e.clientX,e.clientY];

  svg.insert("circle", "rect")
	.attr("cx", m[0])
	.attr("cy", m[1])
	.attr("r", 1e-6)
	.style("stroke", color ? color : d3.hsl((i = (i + 1) % 360), 1, .5))
	.style("stroke-opacity", 1)
	.style("stroke-width","2")
	.style("fill","transparent")
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove();
    $("circle").css("pointer-events","none");
    e.preventDefault();
}
function pixelate() {

    /// if in play mode use that value, else use slider value
    var size = pixelateValue*0.01

        /// cache scaled width and height
        w = canvas.width * size,
        h = canvas.height * size;
    if ( size > 0.5 ) return;
    if ( size == 0.45 ){
	ctx.drawImage(img,0,0,canvas.width,canvas.height);
    }
    /// draw original image to the scaled size
    ctx.drawImage(img, 0, 0, w, h);

    /// then draw that scaled image thumb back to fill canvas
    /// As smoothing is off the result will be pixelated
    ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
}
