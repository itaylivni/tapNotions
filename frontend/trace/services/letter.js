var Letter = function(parent){
    var self      = this;
    var letters   = {};
    var container = null;
    var style     = {
	letterSpacing : 7, // pixels
	scale         : 1,
	fontSize      : 0, // default font size
    }
    console.log(self);
    this.loadText = function(word){
	console.log(word);
	for (var i = 0, n = word.length; i < n; i++){	    
	    Snap.load("./fonts/"+word[i]+".svg",function(data){
		console.log([word[i],data]);
		self.addLetter(word[i],data);
		if ( i == n-1 )
		    self.update();
	    });
	}
	return self;
    }
    this.addLetter = function(letter,svg){
	// Adds a letter to the letters object. Run this.update() to add it to the DOM
	letters[letter] = svg;
	return self;
    }
    this.update = function(){
	// Concatenates all letters into one doc fragment and then appends the container (which is a Snap object)
	var total = document.createDocumentFragment();
	for (var letter in letters){
	    console.log([letter,letters[letter]]);
	    total.appendChild(letters[letter]);
	}
	container.append(total);
	return self;
    }
    this.attr = function(attr,value){
	// Sets or retrieves the specified attribute on the container
	return self;
    }
    this._init = function(){
	// Init
	container = document.createElement("g");
	parent.append(container);
	return self;
    }

    return self._init();
}
