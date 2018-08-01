var localMediaStream = null;
var localScriptProcessor = null;
audioData = []; // �^���f�[�^
var mCount=0;

function onRecProcess(input,procsize)
{
	var bufferData = new Float32Array(procsize);

	for (var i = 0; i < procsize; i++) {
		bufferData[i] = input[i];
	}
	
	if(mCount<1024){
		audioData.push(bufferData);
		if(mCount%16==0){
			var recsec = mCount*procsize/sampleRate*10;
			var irecsec = Math.floor(recsec)/10;			
			log.innerText  ="Recording:"
			log.innerText += irecsec;
			log.innerText +="sec\n";
		}
	} else if(mCount==128){
		exportWAV(audioData);
		stopWaveRecord();
	}
	mCount++;
};

var exportWAV = function(audioData) {
	var sampleRate = mAudioContext.sampleRate;
	var encodeWAV = function(samples, sampleRate) {
		var buffer = new ArrayBuffer(44 + samples.length * 2);
		var view = new DataView(buffer);

		var writeString = function(view, offset, string) {
			for (var i = 0; i < string.length; i++){
				view.setUint8(offset + i, string.charCodeAt(i));
			}
		};

		var floatTo16BitPCM = function(output, offset, input) {
			for (var i = 0; i < input.length; i++, offset += 2){
				var s = Math.max(-1, Math.min(1, input[i]));
				output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
			}
		};

		writeString(view, 0, 'RIFF');  // RIFF�w�b�_
		view.setUint32(4, 32 + samples.length * 2, true); // ����ȍ~�̃t�@�C���T�C�Y
		writeString(view, 8, 'WAVE'); // WAVE�w�b�_
			writeString(view, 12, 'fmt '); // fmt�`�����N
		view.setUint32(16, 16, true); // fmt�`�����N�̃o�C�g��
		view.setUint16(20, 1, true); // �t�H�[�}�b�gID
			view.setUint16(22, 1, true); // �`�����l����
		view.setUint32(24, sampleRate, true); // �T���v�����O���[�g
		view.setUint32(28, sampleRate * 2, true); // �f�[�^���x
		view.setUint16(32, 2, true); // �u���b�N�T�C�Y
		view.setUint16(34, 16, true); // �T���v��������̃r�b�g��
		writeString(view, 36, 'data'); // data�`�����N
		view.setUint32(40, samples.length * 2, true); // �g�`�f�[�^�̃o�C�g��
		floatTo16BitPCM(view, 44, samples); // �g�`�f�[�^

		return view;
	};

	var mergeBuffers = function(audioData) {
		var sampleLength = 0;
		for (var i = 0; i < audioData.length; i++) {
			sampleLength += audioData[i].length;
		}
		var samples = new Float32Array(sampleLength);
		var sampleIdx = 0;
		for (var i = 0; i < audioData.length; i++) {
			for (var j = 0; j < audioData[i].length; j++) {
				samples[sampleIdx] = audioData[i][j];
				sampleIdx++;
			}
		}
		return samples;
	};

	var dataview = encodeWAV(mergeBuffers(audioData), mAudioContext.sampleRate);
	var audioBlob = new Blob([dataview], { type: 'audio/wav' });

	download(audioBlob,"popLooper.wav");

	var myURL = window.URL || window.webkitURL;
	var url = myURL.createObjectURL(audioBlob);
	return url;
};

//-- 	------------------------------------------------------------------	-->

function download(blob, filename) {
	var objectURL = (window.URL || window.webkitURL).createObjectURL(blob),

// createElement�͂��̖��O�̒ʂ�A�G�������g(�I�u�W�F�N�g)�𐶐����܂��B
// �����ł̃G�������g�Ƃ����̂́AHTML�̃^�O�̂��Ƃł�
	a = document.createElement('a');

// a�v�f��download�����Ƀt�@�C������ݒ�
	a.download = filename;
	a.href = objectURL;

// �w�肳�ꂽ�^�C�v�� �C�x���g ���쐬���܂��B�Ԃ����I�u�W�F�N�g�͏��߂ɏ���
// ������K�v������A���̌�� element.dispatchEvent �֓n�����Ƃ��ł��܂��B
	e = document.createEvent('MouseEvent');

// click�C�x���g�𒅉�
// event.initMouseEvent(type, canBubble, cancelable, view,
//                      detail, screenX, screenY, clientX, clientY,
//                      ctrlKey, altKey, shiftKey, metaKey,
//                      button, relatedTarget);

// https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

		e.initEvent("click", true, true, window,
				1, 0, 0, 0, 0,
				false, false, false, false,
				0, null);

	a.dispatchEvent(e);
	}
