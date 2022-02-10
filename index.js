let eingabe = document.querySelector("#berechnen")
let ergebnis = document.querySelector("#monatsrate")
let ratendiv = document.querySelector("#monatsrate")
function index(){
    eingabe.addEventListener("click", artauswahl)
}

function artauswahl(){
    ratendiv.innerHTML = ""

    let auswahl = document.querySelector("#darlehensart").value

    if (auswahl === "annuitaetendarlehen"){
        annuitaetendarlehen()
    }
    else if (auswahl === "tilgungsdarlehen") {
        tilgungsdarlehen()
    }

    else if (auswahl === "faelligkeitsdarlehen") {
        faelligskeitsdarlehen()
    }
}

function annuitaetendarlehen(){
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let monatsrate = (summe * (((1 + (zinsen / 12)) ** (laufzeit) * zinsen) / ((1 + (zinsen / 12)) ** (laufzeit) - 1))) / 12
    ergebnis.innerText = monatsrate.toFixed(2) + "€"
}

function tilgungsdarlehen() {
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let festerate = summe / laufzeit
    let rate = 0
    let tilgungohnezinsen = document.createElement("h3")
    tilgungohnezinsen.innerText = "Feste Tilgungsrate ohne Zinsen: " + festerate.toFixed(2) + " €"
    ratendiv.appendChild(tilgungohnezinsen)
    let x = 1
    while (summe > 0) {

        rate = (summe * (zinsen / laufzeit)) + festerate
        summe = summe - festerate
        let zahlung = document.createElement("div")
        zahlung.innerText = x + ". Rate: " + rate.toFixed(2) + " €"
        ratendiv.appendChild(zahlung)
        x++
    }
}

function faelligskeitsdarlehen(){
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100

    let rate = summe * (zinsen / laufzeit)
    let rategesammt = rate * laufzeit
    let zahlung = document.createElement("div")
    let geszahlung = document.createElement("div")
    zahlung.innerText = "Monatliche Rate: " + rate.toFixed(2) + " €"
    geszahlung.innerHTML = "Gesammte Zinsbelastung: " + rategesammt.toFixed(2) + " €"
    ratendiv.appendChild(zahlung)
    ratendiv.appendChild(geszahlung)

}


index()