chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'summary') {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/readiness');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ message: request.text ?? '', length: request.length }));
        xhr.onload = () => {
            var summary = xhr.response.substring(12, xhr.response.length - 2)
            sendResponse(summary)
        };
        return true;
    }
    if (request.action === 'audio_play') {
        chrome.tts.speak(
            request.text,
            {
                rate: 0.8,
                onEvent: (event) => {
                    if (event.type == 'end') {
                        sendResponse()
                    }
                }
            },
            () => { }
        )
        return true
    }
    if (request.action === 'audio_stop') {
        chrome.tts.stop()
        return true
    }
    if (request.action === 'download_txt') {
        var blob = new Blob([request.text], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url // The object URL can be used as download URL
        });
        return true
    }
});