var isSupported = false;
var playing = false;
var chart;
var data = [
  {"key": "Acc.x", "values": [] },
  {"key": "Acc.y", "values": [] },
  {"key": "Acc.z", "values": [] },
  {"key": "AccG.x", "values": [] },
  {"key": "AccG.y", "values": [] },
  {"key": "AccG.z", "values": [] },
  {"key": "alpha", "values": [] },
  {"key": "beta", "values": [] },
  {"key": "gamma", "values": [] }
];
var cnt = 1;

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

  chart = nv.models.lineWithFocusChart();

  chart.xAxis.tickFormat(d3.format(',f')).axisLabel('Time');
  chart.yAxis.tickFormat(d3.format(',.2f'));
  chart.y2Axis.tickFormat(d3.format(',.2f'));

  nv.addGraph(loadGraph);
}

function deviceMotionHandler(eventData) {
  if(!isSupported || !playing) return;

  var acceleration = eventData.acceleration;
  var accelerationG = eventData.accelerationIncludingGravity;
  var rotation = eventData.rotationRate;

  data[0].values.push({ x: cnt, y: acceleration.x });
  data[1].values.push({ x: cnt, y: acceleration.y });
  data[2].values.push({ x: cnt, y: acceleration.z });
  data[3].values.push({ x: cnt, y: accelerationG.x });
  data[4].values.push({ x: cnt, y: accelerationG.y });
  data[5].values.push({ x: cnt, y: accelerationG.z });
  data[6].values.push({ x: cnt, y: rotation.alpha });
  data[7].values.push({ x: cnt, y: rotation.beta });
  data[8].values.push({ x: cnt, y: rotation.gamma });

  cnt++;
  loadGraph();

  document.getElementById('log').value +=
      '[Acceleration] ' + acceleration.x + ', ' + acceleration.y + ', ' + acceleration.z + ' ' +
      '[AccelerationIncludingG] ' + accelerationG.x + ', ' + accelerationG.y + ', ' + accelerationG.z + ' ' +
      '[Rotation] ' + rotation.alpha + ', ' + rotation.beta + ', ' + rotation.gamma + '/n';
}

function loadGraph() {
  d3.select('#chart svg')
    .datum(data)
    .transition().duration(500)
    .call(chart);

  nv.utils.windowResize(chart.update);
  return chart;
}
