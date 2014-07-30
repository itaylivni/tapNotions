// Controller
$(document).ready(function(){
    // Conversions
    var scale = {};

    // Default view values
    var textSize = 4; // Em

    // Init
    var s = Snap("#screen");
    var email = new Letter(Snap("#email_text")).loadText("e-mail");
    email.complete = function(){
	// Write the text on a line
	email.normalize();
	
	// Get the text's container and center it horizontally, and vertically align to the top
	var container = email.getContainer().node;
	var dim = container.getBoundingClientRect();
	$(container).attr("transform","translate("+(($(window).width()/2)-(dim.width/2))+" "+(dim.height)+")");

	// Turn the "e" white
	email.attr("e",{
	    "fill"        : "#fff",
	    "stroke"      : "#000",
	    "fill-opacity": 1
	});

	// Bounding regions
	var region = [
	    [27,40,15,30]
	];

	// Mouseover on e
	$("#screen").on("mouseover",function(){
	    particle(this);
	})
	email.getLetter("e").el.on({
	    "click" : function(e){
		alert([e.clientX-pos.left,e.clientY-pos.top]);
	    },
	    "mousemove" : function(e){
		var pos = $(this).position();
		over = true;
		particle();
		pos = [e.clientX-pos.left,e.clientY-pos.top];
		for (var i = region.length-1; i > -1; i--){
		    if ( pos[0] >= region[i][0] && pos[0] <= region[i][0]+region[i][2] ){
			particle([e.clientX,e.clientY]);
			if ( pos[1] >= region[i][1] && pos[1] <= region[i][3] ){
			    console.log("entered");
			}
		    }
		}
	    },
	    "mouseout" : function(){
		over = false;
	    }
	});
	var over = false;
	var i = 0;
	var svg = d3.select("#screen");
	function particle() {

	    var m = [window.event.clientX,window.event.clientY];
	    
	    svg.insert("circle", "rect")
		.attr("cx", m[0])
		.attr("cy", m[1])
		.attr("r", 1e-6)
		.style("fill","transparent")
		.style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
		.style("stroke-opacity", 1)
		.transition()
		.duration(2000)
		.ease(Math.sqrt)
		.attr("r", 100)
		.style("stroke-opacity", 1e-6)
		.remove();
	    window.event.preventDefault();
	}
    }
});
