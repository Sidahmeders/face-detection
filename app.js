
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}


video.addEventListener('play', () => {
    console.log('cool video')

    setInterval(async () => {
        const detection = await faceapi.detectAllFaces(
            video, 
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions()
        console.log(detection)
    })

})