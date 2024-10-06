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
