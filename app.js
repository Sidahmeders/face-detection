
const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}


video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)

    setInterval(async () => {
        const detection = await faceapi.detectAllFaces(
            video, 
            new faceapi.TinyFaceDetectorOptions()
        ).withFaceLandmarks().withFaceExpressions()
        console.log(detection) // Console Log

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        

        const resizeedDetections = faceapi.resizeResults(detection, displaySize)
        faceapi.draw.drawDetections(canvas, resizeedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizeedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizeedDetections)
    }, 100)

})