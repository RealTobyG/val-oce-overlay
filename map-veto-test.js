let r1 = document.getElementById('r1').value
let g1 = document.getElementById('g1').value
let b1 = document.getElementById('b1').value
let r2 = document.getElementById('r2').value
let g2 = document.getElementById('g2').value
let b2 = document.getElementById('b2').value
let r3 = document.getElementById('r3').value
let g3 = document.getElementById('g3').value
let b3 = document.getElementById('b3').value
let r4 = document.getElementById('r4').value
let g4 = document.getElementById('g4').value
let b4 = document.getElementById('b4').value



function setGradient() {
    let r1 = document.getElementById('r1').value
    let g1 = document.getElementById('g1').value
    let b1 = document.getElementById('b1').value
    let r2 = document.getElementById('r2').value
    let g2 = document.getElementById('g2').value
    let b2 = document.getElementById('b2').value
    let r3 = document.getElementById('r3').value
    let g3 = document.getElementById('g3').value
    let b3 = document.getElementById('b3').value
    let r4 = document.getElementById('r4').value
    let g4 = document.getElementById('g4').value
    let b4 = document.getElementById('b4').value
    document.styleSheets[0].deleteRule(8)
    document.styleSheets[0].insertRule(`#flowy-background { background: linear-gradient(to bottom, rgb(${r1}, ${g1}, ${b1}), rgb(${r3}, ${g3}, ${b3})); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); }`, 8)
    document.styleSheets[0].deleteRule(9)
    document.styleSheets[0].insertRule(`#flowy-background::after {background: linear-gradient(to bottom, rgb(${r2}, ${g2}, ${b2}), rgb(${r4}, ${g4}, ${b4})); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); }`, 9)
    // document.styleSheets[0].cssRules[8].cssText = `#flowy-background { background: linear-gradient(rgb(${r3}, ${g3}, ${b3}), rgb(${r1}, ${g1}, ${b1})); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); }`
    // document.styleSheets[0].cssRules[9].cssText = `#flowy-background::after { background: linear-gradient(rgb(${r4}, ${g4}, ${b4}), rgb(${r2}, ${g2}, ${b2})); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); }`
}

document.getElementById('r1').addEventListener('change', setGradient)
document.getElementById('g1').addEventListener('change', setGradient)
document.getElementById('b1').addEventListener('change', setGradient)
document.getElementById('r2').addEventListener('change', setGradient)
document.getElementById('g2').addEventListener('change', setGradient)
document.getElementById('b2').addEventListener('change', setGradient)
document.getElementById('r3').addEventListener('change', setGradient)
document.getElementById('g3').addEventListener('change', setGradient)
document.getElementById('b3').addEventListener('change', setGradient)
document.getElementById('r4').addEventListener('change', setGradient)
document.getElementById('g4').addEventListener('change', setGradient)
document.getElementById('b4').addEventListener('change', setGradient)
// document.getElementById('flowy-background').style.background = `linear-gradient(to top left, rgb(${r3}, ${g3}, ${b3}), rgb(${r1}, ${g1}, ${b1})), linear-gradient(to top right, rgb(${r4}, ${g4}, ${b4}), rgb(${r2}, ${g2}, ${b2}))`

