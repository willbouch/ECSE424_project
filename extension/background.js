chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == 'install') {
        chrome.tabs.create({ url: 'https://docs.google.com/document/d/1JOoE38jFa83XJgSOhtj7gQc2_L2JnH-ZTzRafueZNK8/edit?usp=sharing' })
        chrome.runtime.setUninstallURL('https://forms.gle/qnBbhebh2HvGEeSV6')
    }
});

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
        var blob = new Blob([request.text], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url
        });
        return true
    }
    if (request.action === 'download_mp3') {
        var url = './assets/coming_soon.mp3'

        fetch(url)
            .then(resp => resp.blob())
            .then(blob => chrome.downloads.download({
                url: URL.createObjectURL(blob)
            }));

        return true
    }
    if (request.action === 'help') {
        chrome.tabs.create({ url: 'https://docs.google.com/document/d/1JOoE38jFa83XJgSOhtj7gQc2_L2JnH-ZTzRafueZNK8/edit?usp=sharing' })
        return true
    }
});