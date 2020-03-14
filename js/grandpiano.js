
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

window.addEventListener('load', function (){

	mLocalAudioBuffer= Array(mSOUNDNUM);
	mAudioBuffer = Array(mSOUNDNUM);
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	mAudioContext = new AudioContext(); //Use Audio Interface
	mNode 		= mAudioContext.createScriptProcessor(mBuffersize, 2, 2);
	mNode.onaudioprocess = process;

	mReadFlag=0;

	for(var i=0; i<mSOUNDNUM; i++){
		mLocalAudioBuffer[i]=new LocalAudioBuffer();
	}

	//Key Information
	for(var i=0; i<mSOUNDNUM; i++){
		mKeylim[i]=new Array(3);
	}

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

	mKeyTotal = mKeylim[mf5 ][2] - mKeylim[mc0 ][0]+1;
	mAudioSource = Array(mKeyTotal);
	for(var i=0; i<mKeyTotal; i++){
		mAudioSource[i]=null;
	}

	//Load Files
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTB0.wav" ,mb0 );
	loadDogSound("https://mikatahara.github.io/PianoMachine/wav/PFSTC0.wav" ,mc0 );
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

	// Web MIDI API
	if(document.input_device_select!=null &&
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
	}

}, false);

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

