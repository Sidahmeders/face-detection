
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetectr.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressNet.loadFromUri('/models'),
])

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}


video.addEventListener('play', () => console.log('cool video'))