function LocalAudioBuffer()
{
	this.buffer=0;
	this.length=0;
	this.counter=0;
	this.vel=0;
}

LocalAudioBuffer.prototype={
	fSetBuffer : function(buffer){ 
		this.buffer=buffer.getChannelData(0);
		this.length=buffer.length;
		this.counter=buffer.length;
	},

	fReadData : function(){
		if(this.counter==this.length) this.data=0;
		else {
			this.data=this.buffer[this.counter];
			this.counter++;
		}
		return this.vel*this.data;
	},

	fClearCounter : function(){
		this.counter=0;
	}

}

function loadDogSound(url, n) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

// Decode asynchronously
	request.onload = function() {
		audioContext.decodeAudioData(request.response, function(buffer) {
		mAudioBuffer[n]= buffer; 
		mReadFlag++;
		}, function(){ alert('Error'); } );
	}
	request.send();
}
