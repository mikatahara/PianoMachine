<!-- 
// ----------------------------------------------------------------------------
// touch Event のプリントモニター
// ----------------------------------------------------------------------------
-->

function touchHandler(e){

	log.innerText = "ON\n";
	touchMonitor(e,-1);
}
function handleStart(e){

	log.innerText = "Start\n";
	touchMonitor(e,1);
}
function handleEnd(e){

	log.innerText = "End\n";
	touchMonitor(e,0);
}

function handleCancel(e){
	log.innerText = "Cancel\n";
	touchMonitor(e,-1);
}

function handleLeave(e){
	log.innerText = "handleLeave\n";
	touchMonitor(e,-1);
}

function handleMove(e){
	log.innerText = "Move\n";
	touchMonitor(e,-1);
}
<!-- 
// ----------------------------------------------------------------------------
// mousedown/mouseup のプリントモニター
// ----------------------------------------------------------------------------
-->
function handleMousedown(e){
	log.innerText = "moudeDown\n";
	chageColor(e,1);
}
function handleMouseup(e){
	log.innerText = "moudeUp\n";
	chageColor(e,0);
}

function chageColor(e,n){
	var rx = Math.floor(e.clientX/mCv.clientWidth*5);
	var ry = Math.floor(e.clientY/mCv.clientHeight*4);

	log.innerText = "dhageColor clientX ";
	log.innerText += e.clientX;
	log.innerText += " clientY ";
	log.innerText += e.clientY;
	log.innerText += " rx ";
	log.innerText += rx;
	log.innerText += " ry ";
	log.innerText += ry;

	if(rx<0 || rx>=5) return;
	if(ry<0 || ry>=4) return;

	var a0 = mPcolor[ry][rx][0];
	var a1 = mPcolor[ry][rx][1];
	var a2 = mPcolor[ry][rx][2];
	var x0=rx*mXx;
	var y0=ry*mYy;

	if(n==1){
		a0=0xFF-a0; a1=0xFF-a1; a2=0xFF-a2;
	}

	mCtx.fillStyle = "rgb("+a0+","+a1+","+a2+")";
	mCtx.fillRect(x0,y0,mXx,mYy);


	if(n==1){
		log.innerText += "GO ";
		log.innerText += mNotenum[3-ry][rx];
		mNoteon(mNotenum[3-ry][rx]);
		log.innerText += " OFF\n";
	} else {
		mNoteoff(mNotenum[3-ry][rx]);
	}
}

function touchMonitor(e,n){

	// TouchList オブジェクトを取得
	var touch_list = e.changedTouches;

	if(touch_list==null) return;
	if(n==-1) return;

	// 中身に順番にアクセス
	var num = touch_list.length;

	for(var i=0; i < num; i++){

		// Touch オブジェクトを取得
		var touch = touch_list[i];

		chageColor(touch,n);

/*
		// 識別番号を取得
		log.innerText += "id:";
		log.innerText += touch.identifier;
		log.innerText +="\n";

		// モニタのスクリーン領域の左上を原点とした座標を取得
		log.innerText += "screenX:";
		log.innerText += touch.screenX;
		log.innerText +=" ";
		log.innerText += "screenY:";
		log.innerText += touch.screenY;
		log.innerText +="\n";

		// ブラウザのクライアント領域の左上を原点とした座標を取得
		log.innerText += "clientX:";
		log.innerText += touch.clientX;
		log.innerText +=" ";
		log.innerText += "clientY:";
		log.innerText += touch.clientY;
		log.innerText +="\n";

		// HTML 全体の左上を原点とした座標を取得
		log.innerText += "pageX:";
		log.innerText += touch.pageX;
		log.innerText +=" ";
		log.innerText += "pageX:";
		log.innerText += touch.pageX;
		log.innerText +="\n";

		log.innerText +="-------\n";
*/
	}
}

<!-- ----------------------------------------------------------------------- -->

	var mCv=null;	//canvas
	var mCtx=null;	//context
	var mXx;
	var mYy;
	var log=null;

	var mPcolor=null;
	var mNnotenum=null;

window.onload = function() {

	mPcolor=new Array(4);
	mNotenum=new Array(4);
	for(var i=0; i<4; i++){
		mPcolor[i]=new Array(5);
		mNotenum[i]=new Array(5);
		for(var j=0; j<5; j++) mPcolor[i][j]=new Array(3);
	}

	mNotenum[0][0]=36+12;
	mNotenum[0][1]=38+12;
	mNotenum[0][2]=40+12;
	mNotenum[0][3]=43+12;
	mNotenum[0][4]=45+12;

	for(i=1; i<4; i++){
		mNotenum[i][0]=mNotenum[i-1][0]+5;
		mNotenum[i][1]=mNotenum[i-1][1]+5;
		mNotenum[i][2]=mNotenum[i-1][2]+5;
		mNotenum[i][3]=mNotenum[i-1][3]+5;
		mNotenum[i][4]=mNotenum[i-1][4]+5;
	}

	log = document.getElementById("log");
	log.font="40pt Arial";

	// タッチイベントをサポートしているか調べる
	if(window.TouchEvent){
		log.innerText += "タッチイベントに対応";
		log.innerText +="\n";
	}else{
		log.innerText += "タッチイベントに未対応";
		log.innerText +="\n";
	}

	var min = 0 ;
	var max = 255 ;

	var a0 = Math.floor( Math.random() * (max + 1 - min) ) + min ;
	var a1 = Math.floor( Math.random() * (max + 1 - min) ) + min ;
	var a2 = Math.floor( Math.random() * (max + 1 - min) ) + min ;

	// 全体クリア
	mCv = document.getElementById('touchBox');
	mCtx = mCv.getContext('2d');
	mXx=mCv.width/5;
	mYy=mCv.height/4;
	var x0=0;
	var y0=0;

	for(var i=0; i<4; i++){
		for(var j=0; j<5; j++){
			a0 = Math.floor( Math.random() * (max + 1 - min) ) + min ;
			a1 = Math.floor( Math.random() * (max + 1 - min) ) + min ;
			a2 = Math.floor( Math.random() * (max + 1 - min) ) + min ;
			mPcolor[i][j][0]=a0;
			mPcolor[i][j][1]=a1;
			mPcolor[i][j][2]=a2;
			mCtx.fillStyle = "rgb("+a0+","+a1+","+a2+")";
			mCtx.fillRect(x0,y0,mXx,mYy);
			x0=x0+mXx;
		}
		y0=y0+mYy;
		x0=0;
	}

	log.innerText  = "height:";
	log.innerText += mCv.clientHeight;
	log.innerText +="\n";
	log.innerText += "width:";
	log.innerText += mCv.clientWidth;
	log.innerText +="\n";

	mCv.addEventListener("touchstart", handleStart, false);
	mCv.addEventListener("touchend", handleEnd, false);
	mCv.addEventListener("touchcancel", handleCancel, false);
	mCv.addEventListener("touchleave", handleLeave, false);
	mCv.addEventListener("touchmove", handleMove, false);
	mCv.addEventListener( "mousedown", handleMousedown ) ;
	mCv.addEventListener( "mouseup", handleMouseup ) ;

}


	const mc0 = 0;
	const mf0 = mc0 +1;
	const mb0 = mf0 +1;

	const md1 = mb0 +1;
	const mf1s= md1 +1;
	const ma1 = mf1s+1;

	const mc2s= ma1 +1;
	const me2 = mc2s+1;
	const ma2 = me2 +1;

	const mc3s= ma2 +1;
	const mf3 = mc3s+1;
	const mg3s= mf3 +1;

	const md4 = mg3s+1;
	const mg4 = md4 +1;
	const mb4 = mg4 +1;

	const md5 = mb4 +1;
	const mf5 = md5 +1;
	const mSOUNDNUM = mf5+1;

	var mLocalAudioBuffer	= null;
	var	mAudioBuffer		= null;
	var mAudioContext		= null;	//Use Audio Interface
	var mBuffersize 		= 1024;
	var mReadFlag			= 0;
	var mAudioSource 		= null;

	var mKeylim 			= new Array(mSOUNDNUM);
	var mKeyTotal 			= 0;

//window.addEventListener('load', function (){

function init_start()
{
	log.innerText ="** A";
	mLocalAudioBuffer= Array(mSOUNDNUM);
	mAudioBuffer = Array(mSOUNDNUM);
	mAudioContext = new AudioContext(); //Use Audio Interface
	mNode 		= mAudioContext.createScriptProcessor(mBuffersize, 2, 2);
	mNode.onaudioprocess = process;
	log.innerText +="** B";

	mReadFlag=0;

	for(var i=0; i<mSOUNDNUM; i++){
		mLocalAudioBuffer[i]=new LocalAudioBuffer();
	}
	log.innerText +="** C";

	//Key Information
	for(var i=0; i<mSOUNDNUM; i++){
		mKeylim[i]=new Array(3);
	}

	log.innerText +="** D";
	mKeylim[mc0 ] = [ 21,36,38 ];
	mKeylim[mf0 ] = [ 39,41,44 ];
	mKeylim[mb0 ] = [ 45,47,48 ];
	mKeylim[md1 ] = [ 49,50,51 ];
	mKeylim[mf1s] = [ 52,54,55 ];
	mKeylim[ma1 ] = [ 56,57,58 ];
	mKeylim[mc2s] = [ 59,61,62 ];
	mKeylim[me2 ] = [ 63,64,66 ];
	mKeylim[ma2 ] = [ 67,69,70 ];
	mKeylim[mc3s] = [ 71,73,74 ];
	mKeylim[mf3 ] = [ 75,77,78 ];
	mKeylim[mg3s] = [ 79,80,83 ];
	mKeylim[md4 ] = [ 84,86,88 ];
	mKeylim[mg4 ] = [ 89,91,93 ];
	mKeylim[mb4 ] = [ 94,95,96 ];
	mKeylim[md5 ] = [ 97,98,99 ];
	mKeylim[mf5 ] = [ 100,101,108 ];

	log.innerText +="** E";
	mKeyTotal = mKeylim[mf5 ][2] - mKeylim[mc0 ][0]+1;
	mAudioSource = Array(mKeyTotal);
	for(var i=0; i<mKeyTotal; i++){
		mAudioSource[i]=null;
	}

	log.innerText +="** F";
	//Load Files
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTB0.wav" ,mb0 );
	log.innerText +="** G";

	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTC0.wav" ,mc0 );
	log.innerText +="** H";

	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTF0.wav" ,mf0 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTA1.wav" ,ma1 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTD1.wav" ,md1 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTFs1.wav",mf1s);
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTA2.wav" ,ma2 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTCs2.wav",mc2s);
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTE2.wav" ,me2 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTCs3.wav",mc3s);
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTF3.wav" ,mf3 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTGs3.wav",mg3s);
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTB4.wav" ,mb4 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTD4.wav" ,md4 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTG4.wav" ,mg4 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTD5.wav" ,md5 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTF5.wav" ,mf5 );

/*	var timerId=setInterval(function(){
		if(mReadFlag==mSOUNDNUM){
			clearInterval(timerId);
			for(i=21; i<100; i++){
				goPianoSound( i )
			}
		}
	}, 500 );
*/

	log.innerText +="** I";
	// Web MIDI API
/*	if(document.input_device_select!=null &&
		document.output_device_select!=null){
		setInputMenuID(document.input_device_select.ids);
		setOutputMenuID(document.output_device_select.ids);
		runTest();

		var timerId2=setInterval(function(){
			if(input!=null){
				clearInterval(timerId2);
				input.onmidimessage = handleMIDIMessageGroundpiano;
			}
		}, 500 );
	}*/
}

// }, false);

function loadDogSound(url, n) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

// Decode asynchronously
	request.onload = function() {
		mAudioContext.decodeAudioData(request.response, function(buffer) {
		mAudioBuffer[n]= buffer; 
		mLocalAudioBuffer[n].fSetBuffer(mAudioBuffer[n]);
		mReadFlag++;
		}, function(){ alert('Error'); } );
	}
	request.send();
}

function setMIDIinputDevice(e)
{
	inputDeviceSelect(e);
	input.onmidimessage = handleMIDIMessageGroundpiano;
}

function handleMIDIMessageGroundpiano( event )
{
	var str=null;
	var status, data1, data2;

	if( event.data[0] ==0xFE ) return;
	if( event.data[0] ==0xF8 ) return;

	status = event.data[0]&0xF0;
	data1  = event.data[1];
	data2  = event.data[2];

	if(status==0x90 && data2==0) status=0x80;

	switch( status ){
		case 0x80:
			mNoteoff(data1);
			mPushkey[data1]=0;
			break;
		case 0x90:
			mNoteon(data1);
			mPushkey[data1]=1;
			break;
		case 0xA0:
			break;
		case 0xB0:
			break;
		case 0xC0:
			break;
		case 0xD0:
			break;
		case 0xE0:
			break;
		case 0xF0:
			break;
	}

}

function mNoteoff( ckay )
{
	var jnum=ckay- mKeylim[mc0 ][0];

	if(mAudioSource[jnum]!=null){
		mAudioSource[jnum].stop(1);								// play the source now
		mAudioSource[jnum]=null;
	}
}

function mNoteon( ckey )
{
	var cnum=0;
	var jnum=ckey- mKeylim[mc0 ][0];

	log.innerText+=" mNoteon ";
	log.innerText+=ckey;

	if( jnum >= mKeyTotal ) return; 

	for(var i=0; i<mSOUNDNUM; i++){
		if( ckey >= mKeylim[i][0] && ckey <= mKeylim[i][2] ) {
			cnum =i;
			break;
		}
	}

	var computedPlaybackRate = Math.pow(2, (ckey-mKeylim[cnum][1])/12);

	if(mAudioSource[jnum]!=null ){
		mAudioSource[jnum].stop(10);							// play the source now
		mAudioSource[jnum]=null;
	}

	mAudioSource[jnum] = mAudioContext.createBufferSource();	// creates a sound source
	mAudioSource[jnum].buffer = mAudioBuffer[cnum];				// tell the source which sound to play
	mAudioSource[jnum].connect(mNode);
	mNode.connect(mAudioContext.destination);
	mAudioSource[jnum].playbackRate.value = computedPlaybackRate;
	mAudioSource[jnum].start(0);								// play the source now
}

/* Audio Buffer が一杯になったらこの関数が呼ばれる */
function process(audioProcessingEvent){

	// The input buffer is the song we loaded earlier
	var inputBuffer = audioProcessingEvent.inputBuffer;

	// The output buffer contains the samples that will be modified and played
	var outputBuffer = audioProcessingEvent.outputBuffer;


	// Loop through the output channels (in this case there is only one)
	for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
		var inputData = inputBuffer.getChannelData(channel);
		var outputData = outputBuffer.getChannelData(channel);

		// Loop through the 4096 samples
		for (var sample = 0; sample < inputBuffer.length; sample++) {
			// make output equal to the same as the input
			outputData[sample] = inputData[sample];
			// add noise to each output sample
//			outputData[sample] += ((Math.random() * 2) - 1) * 0.2;         
		}
	}

	if(mRecStart){
		onRecProcess(outputData,outputData.length);
	}

}

var mRecStart=0;

function startWaveRecord()
{
	mRecStart=1;
}

function stopWaveRecord()
{
	exportWAV(audioData);
	mRecStart=0;
	mCount=0;
	audioData = [];
}

