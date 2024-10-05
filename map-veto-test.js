function setGradient() {
    document.documentElement.style.setProperty('--c1', `${document.getElementById('c1').value}`)
    document.documentElement.style.setProperty('--c2', `${document.getElementById('c2').value}`)
    document.documentElement.style.setProperty('--c3', `${document.getElementById('c3').value}`)
    document.documentElement.style.setProperty('--c4', `${document.getElementById('c4').value}`)
    document.documentElement.style.setProperty('--f1', `${document.getElementById('f1').value}`)
    document.documentElement.style.setProperty('--f2', `${document.getElementById('f2').value}`)
}


document.getElementById('c1').addEventListener('change', setGradient)
document.getElementById('c2').addEventListener('change', setGradient)
document.getElementById('c3').addEventListener('change', setGradient)
document.getElementById('c4').addEventListener('change', setGradient)
document.getElementById('f1').addEventListener('change', setGradient)
document.getElementById('f2').addEventListener('change', setGradient)