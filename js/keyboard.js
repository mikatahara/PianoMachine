
	var mPushkey=Array(128);

window.addEventListener('load', function (){

	document.onkeydown = keydown;
	document.onkeyup = keyup;
	for(var i=0; i<128; i++){ mPushkey[i]=0; }

	//Piano Keyboard PICT
	pianopict_init();

}, false);

function keydown(event) {

	var l_keycode=event.keyCode;

	if(l_keycode>=48 && l_keycode<=57){
		pianopict_change(l_keycode-48);

	} else {

		var cKeynum=setKeycode(event.keyCode);

		if(cKeynum!=-1){

			if(mPushkey[cKeynum]==0){
				mNoteon(cKeynum);
				mPushkey[cKeynum]=1;
			}
		}
	}
}

function keyup(event) {

	var cKeynum=setKeycode(event.keyCode);

	if(cKeynum!=-1){

		if(mPushkey[cKeynum]==1){
			mNoteoff(cKeynum);
			mPushkey[cKeynum]=0;
		}
	}

}

function setKeycode( num ){

	var cKeynum=-1;

	switch(num){

		case 90:	//Z ->C
			cKeynum=60;
			break;
		case 83:	//S ->C#
			cKeynum=61;
			break;
		case 88:	//X ->D
			cKeynum=62;
			break;
		case 68:	//D ->D#
			cKeynum=63;
			break;
		case 67:	//C ->E
			cKeynum=64;
			break;
		case 86:	//C ->F
			cKeynum=65;
			break;
		case 71:	//G ->F#
			cKeynum=66;
			break;
		case 66:	//B ->G
			cKeynum=67;
			break;
		case 72:	//H ->G#
			cKeynum=68;
			break;
		case 78:	//N ->A
			cKeynum=69;
			break;
		case 74:	//J ->A#
			cKeynum=70;
			break;
		case 77:	//M ->B
			cKeynum=71;
			break;
		case 188:	//< ->C
			cKeynum=72;
			break;
	}

	return cKeynum-numKeyShift*12;
}
