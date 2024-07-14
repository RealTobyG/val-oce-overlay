const TeamAName = document.querySelector("#team-a-name")
const TeamBName = document.querySelector("#team-b-name")

const TeamANameIGO = document.querySelector("#team-a-name-igo")
const TeamBNameIGO = document.querySelector("#team-b-name-igo")
const TeamALogoIGO = document.querySelector("#team-a-logo-igo")
const TeamBLogoIGO = document.querySelector("#team-b-logo-igo")

const SwapTeams = document.querySelector("#swap-teams")

const OverlaySelection = document.querySelector("#overlay-selection")


function setOverlay() {
    const SelectedOption = document.getElementById('overlay-selection').value
    const IGO = document.querySelector("#in-game-overlay")
    if (SelectedOption === "GC2024") {
        IGO.setAttribute("class", "gc2024-igo")
    } else if (SelectedOption === "VCT2024") {
        IGO.setAttribute("class", "vct2024-igo")
    } else {
        IGO.setAttribute("class", "lpl-igo")
    }
}

OverlaySelection.addEventListener("change", setOverlay)


function setIGOnames() {
    TeamANameIGO.textContent = `${TeamAName.value}`
    TeamBNameIGO.textContent = `${TeamBName.value}`
}

TeamAName.addEventListener("keyup", setIGOnames);
TeamBName.addEventListener("keyup", setIGOnames);


function SwapTeamsIGO() {
    if (TeamANameIGO.classList.contains("team-name-left-igo")) {
        TeamANameIGO.setAttribute("class", "team-name-right-igo")
        TeamBNameIGO.setAttribute("class", "team-name-left-igo")
        TeamALogoIGO.setAttribute("class", "team-logo-right-igo")
        TeamBLogoIGO.setAttribute("class", "team-logo-left-igo")
    } else {
        TeamBNameIGO.setAttribute("class", "team-name-right-igo")
        TeamANameIGO.setAttribute("class", "team-name-left-igo")
        TeamBLogoIGO.setAttribute("class", "team-logo-right-igo")
        TeamALogoIGO.setAttribute("class", "team-logo-left-igo")
    }
}

SwapTeams.addEventListener("click", SwapTeamsIGO);