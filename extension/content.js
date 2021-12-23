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
        var numSentences = selectedText.split('.').length - 1
        let length
        if (request.action === 'short') length = Math.ceil(numSentences * 0.15)
        if (request.action === 'medium') length = Math.ceil(numSentences * 0.25)
        if (request.action === 'long') length = Math.ceil(numSentences * 0.35)
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
        chrome.runtime.sendMessage({ action: 'download_txt', text: request.text }, (a) => { })
        return true
    }
    if (request.action === 'download_mp3') {
        chrome.runtime.sendMessage({ action: 'download_mp3' }, (a) => { })
        return true
    }
    if (request.action === 'help') {
        chrome.runtime.sendMessage({ action: 'help' }, () => { })
        return true
    }
})
