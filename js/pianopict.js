var pianopict=null;

function pianopict_init()
{
	pianopict = document.getElementById("keyboard");
	pianopict.innerHTML = "<img src=\"jpeg/pianokey5.jpg\" width=\"1200\">";
}

function pianopict_change(n)
{
	switch(n){
		case 3:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey3.jpg\" width=\"1200\">";
			break;
		case 4:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey4.jpg\" width=\"1200\">";
			break;
		case 5:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey5.jpg\" width=\"1200\">";
			break;
		case 6:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey6.jpg\" width=\"1200\">";
			break;
		case 7:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey7.jpg\" width=\"1200\">";
			break;
		case 8:
			pianopict.innerHTML = "<img src=\"jpeg/pianokey8.jpg\" width=\"1200\">";
			break;
	}
}
