var isSupported = false;
var playing = false;

// check suport
if (window.DeviceMotionEvent) {
  isSupported = true;
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  alert('DeviceMotionEvent not supported.')
  var startBtn = document.getElementById('start-record');
  startBtn.className = startBtn.className + ' disable';
}

var playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', function() {
  playing = !playing;
  var icon = 'img/' + (playing ? 'pause' : 'play') + '.svg';
  playBtn.setAttribute('src', icon);
});

}
