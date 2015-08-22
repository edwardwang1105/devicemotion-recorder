if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', deviceMotionHandler, false);
} else {
  alert('DeviceMotionEvent not supported.')
  var startBtn = document.getElementById('start-record');
  startBtn.className = startBtn.className + ' disable';
}

function deviceMotionHandler() {

}
