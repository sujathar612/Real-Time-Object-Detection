const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let model;

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Webcam not supported by your browser');
    throw new Error('Webcam not supported');
  }
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  });
  video.srcObject = stream;
  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadModel() {
  model = await cocoSsd.load();
}

function detectFrame() {
  model.detect(video).then(predictions => {
    renderPredictions(predictions);
    requestAnimationFrame(detectFrame);
  });
}

function renderPredictions(predictions) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);

  predictions.forEach(prediction => {
    const [x, y, width, height] = prediction.bbox;
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);
    ctx.fillStyle = '#00FF00';
    ctx.font = '18px Arial';
    ctx.fillText(`${prediction.class} ${Math.round(prediction.score * 100)}%`, x, y - 5);
  });
}

async function run() {
  await setupCamera();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  await loadModel();
  detectFrame();
}

window.run = run;
