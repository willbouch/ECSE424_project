var body;

document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            JSON.stringify({ action: 'short', text: document.getElementById('summary_area').innerHTML }),
            fillTextArea)
    })

    document.querySelectorAll('input[type=radio][name="length"]')
        .forEach(radio => radio.addEventListener('change', () => {
            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    JSON.stringify({ action: radio.value, text: document.getElementById('summary_area').innerHTML }),
                    fillTextArea
                )
            })
        }))

    document.getElementById('audio_play').addEventListener('click', () => {
        document.getElementById('audio_play').style.display = 'none';
        document.getElementById('audio_stop').style.display = 'inherit';
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                JSON.stringify({
                    action: 'audio_play',
                    text: document.getElementById('summary_area').innerHTML
                })
            )
        })
    })

    document.getElementById('audio_stop').addEventListener('click', () => {
        document.getElementById('audio_stop').style.display = 'none';
        document.getElementById('audio_play').style.display = 'inherit';
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                JSON.stringify({ action: 'audio_stop' })
            )
        })
    })

    document.getElementById('help_text').addEventListener('click', () => {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                JSON.stringify({ action: 'help' })
            )
        })
    })

    document.getElementById('txt').addEventListener('click', () => {
        document.getElementById('confirmation').style.display = 'inherit';
        document.getElementById('pisse').style.display = 'none';

        document.getElementById('confirm').addEventListener('click', () => {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('pisse').style.display = 'inherit';

            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    JSON.stringify({
                        action: 'download_txt',
                        text: document.getElementById('summary_area').innerHTML
                    }))
            })
        })

        document.getElementById('no-confirm').addEventListener('click', () => {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('pisse').style.display = 'inherit';
        })
    })

    document.getElementById('mp3').addEventListener('click', () => {
        document.getElementById('confirmation').style.display = 'inherit';
        document.getElementById('pisse').style.display = 'none';

        document.getElementById('confirm').addEventListener('click', () => {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('pisse').style.display = 'inherit';

            chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    JSON.stringify({
                        action: 'download_mp3'
                    }))
            })
        })

        document.getElementById('no-confirm').addEventListener('click', () => {
            document.getElementById('confirmation').style.display = 'none';
            document.getElementById('pisse').style.display = 'inherit';
        })
    })

    function fillTextArea(selectedText) {
        document.getElementById('summary_area').innerHTML = selectedText
    }

}, false)
