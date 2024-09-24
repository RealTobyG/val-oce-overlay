let c1 = document.getElementById('c1').value
let c2 = document.getElementById('c2').value
let c3 = document.getElementById('c3').value
let c4 = document.getElementById('c4').value
backgroundInterval = null
backgroundState = 1

function setGradient() {
    if (backgroundInterval !=null) {
        clearInterval(backgroundInterval)
        backgroundInterval = null
    }
    let b1 = document.getElementById('flowy-background-1')
    let b2 = document.getElementById('flowy-background-2')
    c1 = document.getElementById('c1').value
    c2 = document.getElementById('c2').value
    c3 = document.getElementById('c3').value
    c4 = document.getElementById('c4').value
    
    // document.styleSheets[0].deleteRule(8)
    // document.styleSheets[0].insertRule(`#flowy-background-1 { background: linear-gradient(to bottom, ${c1}, ${c4}); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); transition: 5s;}`, 8)
    // document.styleSheets[0].deleteRule(9)
    // document.styleSheets[0].insertRule(`#flowy-background-1::after {background: linear-gradient(to bottom, ${c2}, ${c3}); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); transition: 5s;}`, 9)

    
    if (backgroundState === 1) {
        document.styleSheets[0].deleteRule(10)
        document.styleSheets[0].insertRule(`#flowy-background-2 { background: linear-gradient(to bottom, ${c4}, ${c3}); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); transition: 5s;}`, 10)
        document.styleSheets[0].deleteRule(11)
        document.styleSheets[0].insertRule(`#flowy-background-2::after {background: linear-gradient(to bottom, ${c1}, ${c2}); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); transition: 5s;}`, 11)
        b2.style.opacity = 1
        b1.style.opacity = 0
        
        backgroundState = 2
        backgroundInterval = setInterval(setGradient, 5000)
    } else if (backgroundState === 2) {
        document.styleSheets[0].deleteRule(8)
        document.styleSheets[0].insertRule(`#flowy-background-1 { background: linear-gradient(to bottom, ${c3}, ${c2}); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); transition: 5s;}`, 8)
        document.styleSheets[0].deleteRule(9)
        document.styleSheets[0].insertRule(`#flowy-background-1::after {background: linear-gradient(to bottom, ${c4}, ${c1}); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); transition: 5s;}`, 9)
        b1.style.opacity = 1
        b2.style.opacity = 0

        backgroundState = 3
        backgroundInterval = setInterval(setGradient, 5000)
    } else if (backgroundState === 3) {
        document.styleSheets[0].deleteRule(10)
        document.styleSheets[0].insertRule(`#flowy-background-2 { background: linear-gradient(to bottom, ${c2}, ${c1}); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); transition: 5s;}`, 10)
        document.styleSheets[0].deleteRule(11)
        document.styleSheets[0].insertRule(`#flowy-background-2::after {background: linear-gradient(to bottom, ${c3}, ${c4}); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); transition: 5s;}`, 11)
        b2.style.opacity = 1
        b1.style.opacity = 0
        
        backgroundState = 4
        backgroundInterval = setInterval(setGradient, 5000)
    } else if (backgroundState === 4) {
        document.styleSheets[0].deleteRule(8)
        document.styleSheets[0].insertRule(`#flowy-background-1 { background: linear-gradient(to bottom, ${c1}, ${c4}); width: 1920px; height: 1080px; mask-image: url("assets/Mask_Test.png"); transition: 5s;}`, 8)
        document.styleSheets[0].deleteRule(9)
        document.styleSheets[0].insertRule(`#flowy-background-1::after {background: linear-gradient(to bottom, ${c2}, ${c3}); content: ""; position: absolute; width: inherit; height: inherit; mask-image: linear-gradient(to left, white, transparent); transition: 5s;}`, 9)
        b1.style.opacity = 1
        b2.style.opacity = 0
        
        backgroundState = 1
        backgroundInterval = setInterval(setGradient, 5000)
    }
}

document.getElementById('c1').addEventListener('change', setGradient)
document.getElementById('c2').addEventListener('change', setGradient)
document.getElementById('c3').addEventListener('change', setGradient)
document.getElementById('c4').addEventListener('change', setGradient)


