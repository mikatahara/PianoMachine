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
		mNoteon(mNotenum[3-ry][rx]);
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

	if(log!=null) log.innerText = "準備できるまでお待ちください。\n";
	log.innerText += "height:";
	log.innerText += mCv.clientHeight;
	log.innerText +=" ";
	log.innerText += "width:";
	log.innerText += mCv.clientWidth;
	log.innerText +="\n";

	if(log!=null){
		var timerId=setInterval(function(){
			log.innerText += "*";
			if(mReadFlag==mSOUNDNUM){
				clearInterval(timerId);
				log.innerText += "\n準備OK 画面を横向きにしてタッチしてください。\n";
			}
		}, 500 );
	}

	mCv.addEventListener("touchstart", handleStart, false);
	mCv.addEventListener("touchend", handleEnd, false);
	mCv.addEventListener("touchcancel", handleCancel, false);
	mCv.addEventListener("touchleave", handleLeave, false);
	mCv.addEventListener("touchmove", handleMove, false);
	mCv.addEventListener( "mousedown", handleMousedown ) ;
	mCv.addEventListener( "mouseup", handleMouseup ) ;

}

