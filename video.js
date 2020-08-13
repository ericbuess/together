

// async function getMedia(constraints) {
//     let stream = null;

//     try {
//         stream = await navigator.mediaDevices.getUserMedia(constraints);
//         /* use the stream */
        
//     } catch(err) {
//         /* handle the error */
//     }
// }
            
function videoCall(peer) {
    var peerIdToCall = connections[0].peer;
    console.log("videoCall: ", peerIdToCall);
    var constraints = { audio: true, video: true };
    // var stream = getMedia(constraints).then(function(){
    //     console.log("got media stream: ", stream);
    // });
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        // use the stream //
        console.log("got media stream: ", stream);
        var mediaConnection = peer.call(peerIdToCall, stream);
        mediaConnection.on('stream', function(stream) {
            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML videa/canvas element
            console.log("receiving media stream...");
            var video = document.querySelector('video');
            // insert stream to the video tag
            video.srcObject = stream;
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('playsinline', '');
            // video.play();
            // video.src = window.URL.createObjectURL(stream);
        });
    })
    .catch(function(err) {
        // handle the error
        console.log("error getting media stream: ", err);
    });
    // Prefer camera resolution nearest to 1280x720.
// var constraints = { audio: true, video: { width: 1280, height: 720 } }; 

// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(mediaStream) {
//   var video = document.querySelector('video');
//   video.srcObject = mediaStream;
//   video.onloadedmetadata = function(e) {
//     video.play();
//   };
// })
// .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

    // var mediaConnection = peer.call(peerIdToCall, stream);
    // var peerId = connections[0].peer
}

function answerCall(peer, mediaConnection) {
    console.log("answer call: ", peer, mediaConnection);
    
    var constraints = { audio: true, video: true };
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        // use the stream
        console.log("got media stream: ", stream);
        mediaConnection.answer(stream);

        console.log("answered call:", stream);
    })
    .catch(function(err) {
        // handle the error
        console.log("error getting media stream: ", err);
    });
}
