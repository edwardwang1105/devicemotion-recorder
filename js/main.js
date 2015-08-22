var isSupported = false;
var playing = false;

init();

function init() {
  if ((window.DeviceMotionEvent) || ('listenForDeviceMovement' in window)) {
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


function deviceMotionHandler(eventData) {
  if(!isSupported || !playing) return;

  var acceleration = eventData.acceleration;
  var accelerationG = eventData.accelerationIncludingGravity;
  var rotation = eventData.rotationRate;

  document.getElementById('log').value +=
      '[Acceleration] ' + acceleration.x + ', ' + acceleration.y + ', ' + acceleration.z + ' ' +
      '[AccelerationIncludingG] ' + accelerationG.x + ', ' + accelerationG.y + ', ' + accelerationG.z + ' ' +
      '[Rotation] ' + rotation.alpha + ', ' + rotation.beta + ', ' + rotation.gamma + '/n';
}
