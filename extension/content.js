chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    request = JSON.parse(request)

    // On popup opening, we check the selected text
    var selectedText = ''
    if (window.getSelection) {
        selectedText = window.getSelection().toString()
    } else if (document.selection && document.selection.type != 'Control') {
        selectedText = document.selection.createRange().selectedText
    }

    if (request.action === 'short' || request.action === 'medium' || request.action === 'long') {
        let length
        if (request.action === 'short') length = 1
        if (request.action === 'medium') length = 3
        if (request.action === 'long') length = 5
        chrome.runtime.sendMessage(
            { action: 'summary', text: selectedText, length: length },
            (summary) => { sendResponse(summary) }
        )
        return true
    }

    if (request.action === 'audio_play') {
        chrome.runtime.sendMessage({ action: 'audio_play', text: request.text }, () => { })
        return true
    }
    if (request.action === 'audio_stop') {
        chrome.runtime.sendMessage({ action: 'audio_stop' }, () => { })
        return true
    }
    if (request.action === 'download_txt') {
        chrome.runtime.sendMessage({ action: 'download_txt', text: request.text }, (a) => {
            sendResponse(selectedText)
        })
        return true
    }
})
