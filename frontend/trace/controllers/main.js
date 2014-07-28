$(document).ready(function(){
    var s = Snap("#screen");
    Snap.load("../font_to_svg/out.svg",loaded);

    function loaded(data){
	console.log(data);
	s.append(data);
    }
});
