var pianopict=null;
var numKeyShift=0;

/*	----------------------------------------------------------------	*/
/* Piano Keyboard PICT Initialize										*/
/*	----------------------------------------------------------------	*/

window.addEventListener('load', function (){

	pianopict = document.getElementById("keyboard");
	pianopict.innerHTML = "<img src=\"jpeg/pianokey3.jpg\" width=\"1200\">";
	pianopict.innerHTML = "<img src=\"jpeg/pianokey4.jpg\" width=\"1200\">";
	pianopict.innerHTML = "<img src=\"jpeg/pianokey6.jpg\" width=\"1200\">";
	pianopict.innerHTML = "<img src=\"jpeg/pianokey7.jpg\" width=\"1200\">";
	pianopict.innerHTML = "<img src=\"jpeg/pianokey8.jpg\" width=\"1200\">";
	pianopict.innerHTML = "<img src=\"jpeg/pianokey5.jpg\" width=\"1200\">";

	pianopict.innerHTML += "<br\">";
	pianopict.innerHTML += "<img src=\"jpeg/octave.jpg\" width=\"1200\">";

	numKeyShift=0;

}, false);

function pianopict_change(n)
{
	switch(n){
		case 3:
			numKeyShift=-2;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey3.jpg\" width=\"1200\">";
			break;
		case 4:
			numKeyShift=-1;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey4.jpg\" width=\"1200\">";
			break;
		case 5:
			numKeyShift=0;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey5.jpg\" width=\"1200\">";
			break;
		case 6:
			numKeyShift=1;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey6.jpg\" width=\"1200\">";
			break;
		case 7:
			numKeyShift=2;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey7.jpg\" width=\"1200\">";
			break;
		case 8:
			numKeyShift=3;
			pianopict.innerHTML = "<img src=\"jpeg/pianokey8.jpg\" width=\"1200\">";
			break;
	}

	if(n>=3 && n<=8){
		pianopict.innerHTML += "<br\">";
		pianopict.innerHTML += "<img src=\"jpeg/octave.jpg\" width=\"1200\">";	
	}
}
