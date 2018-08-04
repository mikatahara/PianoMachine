var mMode=0;
var mArpTimerId=null;
var mBeatx	=512;	//16分音符の長さ　ms
var mArpeggio = 0;
var mArpcnt=0;
var seq	=[ 48, -1, -1, -1, -1, -1, -1, -1 ];	//ドラムの音量

function startArpeggio(e)
{
	if(e.checked==true && mArpTimerId==null){
		mArpeggio=1;
		setArpTimer();
	} else {
		mArpeggio=0;
		clearInterval(mArpTimerId);
		mArpTimerId=null;
	}
}

function edittempo(e)
{
	mBeatx = 60*1000/e.value;
	if(mArpeggio) setArpTimer();
}

function setArpTimer()
{
	if(mArpTimerId!=null){
		clearInterval(mArpTimerId);
		mArpTimerId=null;
	}

	mArpTimerId=setInterval(function(){

		for(var i=0; i<128; i++){
			mArpcnt++;
			if( mArpcnt>= 128 ) mArpcnt=0;
			if(mPushkey[mArpcnt]){
				mNoteon(mArpcnt);
				return;
			}
		}
	}, mBeatx);

}
