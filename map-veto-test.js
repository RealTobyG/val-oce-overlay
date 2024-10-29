function setGradient() {
    document.documentElement.style.setProperty('--bg1', `${document.getElementById('bg1').value}`)
    document.documentElement.style.setProperty('--bg2', `${document.getElementById('bg2').value}`)
    document.documentElement.style.setProperty('--bg3', `${document.getElementById('bg3').value}`)
    document.documentElement.style.setProperty('--bg4', `${document.getElementById('bg4').value}`)
    document.documentElement.style.setProperty('--bga1', `${document.getElementById('bga1').value}`)
    document.documentElement.style.setProperty('--bga2', `${document.getElementById('bga2').value}`)
    document.documentElement.style.setProperty('--frames', `${document.getElementById('frames').value}`)
}


document.getElementById('bg1').addEventListener('change', setGradient)
document.getElementById('bg2').addEventListener('change', setGradient)
document.getElementById('bg3').addEventListener('change', setGradient)
document.getElementById('bg4').addEventListener('change', setGradient)
document.getElementById('bga1').addEventListener('change', setGradient)
document.getElementById('bga2').addEventListener('change', setGradient)
document.getElementById('frames').addEventListener('change', setGradient)


let checkGameEventLog = null
let fileHandle = null
let gameEventLogLastModified = null
let gameEventLogLastLength = 0
let gameEventLogNewEvents = null


async function getGameEventLog() {
    [fileHandle] = await window.showOpenFilePicker({
        types: [{
            description: '.txt files',
            accept: {"game-event-log/*": ['.txt']},
        }],
        excludeAcceptAllOption: true,
        multiple: false,
    })
    // [fileHandle] = document.getElementById('load-game-event-log.value')
    clearGameEventLog(fileHandle, "")
    checkGameEventLog = setInterval(readGameEventLog, 200)
}   

async function readGameEventLog() {
    const fileData = await fileHandle.getFile();
    if (gameEventLogLastModified !== fileData.lastModified) {
        gameEventLogLastModified = fileData.lastModified
        const fileText = await fileData.text()
        const fileTextString = fileText
        gameEventLogNewEvents = fileTextString.slice(gameEventLogLastLength, fileTextString.length)
        gameEventLogLastLength = fileTextString.length
        
        console.log(gameEventLogNewEvents)
    } else {
        console.log('File Unchanged')
    }
    document.getElementById('game-event-log').textContent = gameEventLogNewEvents
}

async function clearGameEventLog(fileHandle, contents) {
    const writable = await fileHandle.createWritable();
  
    await writable.write(contents);
  
    await writable.close();
}

document.getElementById('load-game-event-log').addEventListener('click', getGameEventLog)
document.getElementById('read-game-event-log').addEventListener('click', readGameEventLog)