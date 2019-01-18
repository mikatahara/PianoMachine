var mChrodOn=0;

/*	----------------------------------------------------------------	*/
/*	Define behavire for PC keyboard										*/
/*	----------------------------------------------------------------	*/

var mPushkey=Array(128);

window.addEventListener('load', function (){

	document.onkeydown = keydown;
	document.onkeyup = keyup;
	for(var i=0; i<128; i++){ mPushkey[i]=0; }

//	console.log("Z".charCodeAt(0)); // 90

}, false);

/*	----------------------------------------------------------------	*/
/* Key ‚ª‰Ÿ‚³‚ê‚½‚Æ‚«‚ÌŠÖ”											*/
/*	----------------------------------------------------------------	*/

function keydown(event) {

	var l_keycode=event.keyCode;

	if(l_keycode>=48 && l_keycode<=57){
		pianopict_change(l_keycode-48);
		for(var i=0; i<128; i++){
			mPushkey[i]=0;
			mNoteoff(i);
		}
	
	}

	if( mMode == 1 ){
		chordplay(l_keycode);

	} else {

		var cKeynum=setKeycode(event.keyCode);

		if(cKeynum!=-1){

			if(mPushkey[cKeynum]==0){
				if(!mArpeggio) mNoteon(cKeynum);
				mPushkey[cKeynum]=1;
			}
		}
	}
}

function keyup(event) {

	var l_keycode=event.keyCode;

	if( mMode == 1 ){
		choroff(l_keycode);
		return;
	}

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

	return cKeynum+numKeyShift*12;
}

function chordplay( num ){

	var bkey0=chordbase(num);
	var bkey1;
	var bkey2;

	if(mChrodOn==1) return;

	if(bkey0!=-1){
		bkey1=bkey0+4;
		bkey2=bkey0+7;

		if(mPushkey[bkey0]==0){
			if(!mArpeggio){
				mNoteon(bkey0); mNoteon(bkey1); mNoteon(bkey2);
			}
			mArpcnt=0;
			mPushkey[bkey0]=1; mPushkey[bkey1]=1; mPushkey[bkey2]=1;
		}
		mChrodOn=1;
	}
}

function choroff(num)
{
	var bkey0=chordbase(num);

	if(mChrodOn==0) return;

	if(bkey0!=-1){
		bkey1=bkey0+4;
		bkey2=bkey0+7;

		mPushkey[bkey0]=0;
		mPushkey[bkey1]=0;
		mPushkey[bkey2]=0;
		mChrodOn=0;
	}
}

function chordbase(num)
{

	var cKeynum=-1;

	switch( num ){
		case "C".charCodeAt(0):
			cKeynum = 60;
			break;
		case "D".charCodeAt(0):
			cKeynum = 62;
			break;
		case "E".charCodeAt(0):
			cKeynum = 64;
			break;
		case "F".charCodeAt(0):
			cKeynum = 65;
			break;
		case "G".charCodeAt(0):
			cKeynum = 67;
			break;
		case "A".charCodeAt(0):
			cKeynum = 69;
			break;
		case "B".charCodeAt(0):
			cKeynum = 71;
			break;
	}

	return cKeynum+numKeyShift*12;
}

