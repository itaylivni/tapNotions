function Letter(parent){
    var self      = this;
    var container = parent;
    var letters   = {};
    var style = {
	height        : 0,
	scale         : 0,
	letterSpacing : 7,
	fontSize      : 7, // em
	defaultDim    : {}
    };
    var special = {
	"_-" : "hyphen"
    }

    // Setup
    var hasBeenNormalized = false;

    this.complete = null;

    var buildTransform = function(style){
	var transform = "";
	for (var name in style){
	    transform += name + "(" + style[name] + ") ";
	}
	return transform;
    }
    this.getFontStyle = function(){
	return fontStyle;
    }
    this.getContainer = function(){
	return container;
    }
    this.normalize = function(){
	var x = 0;
	for (var l in letters){
	    var obj = {};
	    obj[l] = {
		"translate" : x + " 0",
		"scale" : (style.height*style.fontSize)/style.defaultDim.height
	    }; 
	    self.transform(obj);
	    x += letters[l].el[0].getBoundingClientRect().width+style.letterSpacing;
	}
	self.update();
	return self;
    }
    this.loadText = function(word){
	var loaded = 0;
	var i = 0;
	var n = word.length;
	function loadLetter(letter){
	    if ( special["_"+letter] ){
		letter = "hyphen";
	    }
	    Snap.load("./fonts/"+letter+".svg",function(data){
		// Extract the g object as a jQuery object and append it to the container
		var g = $(data.node.children[0]).find("g");

		// Add the letter to the object
		self.addLetter(letter,{
		    el : g,
		    style : {}
		});

		// Append the <g> element to the container
		container.append(g[0]);
		if ( !hasBeenNormalized ){
		    hasBeenNormalized = true;
		    style.height = $("#normal_text").height();
		    style.defaultDim = g[0].getBoundingClientRect();
		}		
		i++;
		if ( word[i] ){
		    loadLetter(word[i]);
		}
		else
		    self.complete();
	    });
	}
	loadLetter(word[0]);
	return self;
    }
    this.addLetter = function(letter,value){
	letters["_"+letter] = value;
    }
    this.attr = function(letter,style){
	$(letters["_"+letter].el).find("path").attr(style);
    }
    this.getLetter = function(letter){
	return letters["_"+letter];
    }
    this.transform = function(trans){
	var temp = letters;
	// trans = {all:{},"e":{style:value}}
	for (var prop in trans){
	    for (var styleName in trans[prop]){
		if ( prop == "all" ){
		    for (var l in temp){
			temp[l].style[styleName] = trans[prop][styleName];
		    }
		}
		else {
		    if ( temp[prop] ){
			temp[prop].style[styleName] = trans[prop][styleName];
		    }
		}
	    }	    
	}
	self.update();
	return self;
    }
    this.update = function(){
	for (var l in letters){
	    letters[l].el.attr("transform",buildTransform(letters[l].style));
	}
	return self;
    }
    this.getContainer = function(){
	return container;
    }
    return self;
}
