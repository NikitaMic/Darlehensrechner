const eingabe = document.querySelector("#berechnen")
const ratendiv = document.querySelector("#monatsrate")
const img = document.querySelector("#img")
const ganzeRechnung = document.getElementById("rechnung")
const baseline = document.getElementById("baseline")
const baseline2 = document.getElementById("baseline2")
const bruchwrapper = document.getElementById("bruchwrapper")
const zeile3= document.getElementById("zeile3")
const zeile4= document.getElementById("zeile4")
const zeile1 = document.getElementById("zeile1")
const zeile2 = document.getElementById("zeile2")
const beispielrechnung = document.querySelector("#beispielrechnung")

function index(){
    beispielrechnung.style.display = "none"
    eingabe.addEventListener("click", artauswahl)
}

function artauswahl(){
    ratendiv.innerHTML = ""
   let auswahl = document.querySelector("#darlehensart").value

    if (auswahl === "annuitaetendarlehen"){
        annuitaetenDarlehen()
    }
    else if (auswahl === "tilgungsdarlehen") {
        tilgungsDarlehen()
    }

    else if (auswahl === "faelligkeitsdarlehen") {
        faelligskeitsDarlehen()
    }
}

function annuitaetenDarlehen(){
    beispielrechnung.style.display = "flex"
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let monatsrate = (summe * (((1 + (zinsen / 12)) ** (laufzeit) * zinsen) / ((1 + (zinsen / 12)) ** (laufzeit) - 1))) / 12
    ratendiv.innerText = monatsrate.toFixed(2) + "€"

    baseline2.innerText = "Annuität = Kreditsumme * "
    zeile1.innerHTML = "(1 + (Zinssatz / 12))  <sup> Laufzeit </sup> * Zinssatz"
    zeile2.innerHTML =  "(1 + (Zinssatz / 12))  <sup> Laufzeit </sup> -  1"

    baseline.innerText = monatsrate.toFixed(2) + " = " + summe + " *   "
    zeile3.innerHTML = "(1 + " + zinsen + " / 12)  <sup>" + laufzeit + "</sup> * " + zinsen
    zeile4.innerHTML = "(1 + " + zinsen + " / 12)  <sup>" + laufzeit + "</sup> - 1 "
}

function tilgungsDarlehen() {
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let festeRate = summe / laufzeit
    let rate = 0
    let tilgungOhneZinsen = document.createElement("h3")
    tilgungOhneZinsen.innerText = "Feste monatl. Tilgungsrate ohne Zinsen: " + festeRate.toFixed(2) + " €"
    ratendiv.appendChild(tilgungOhneZinsen)
    let x = 1

    while (summe > 0) {
        rate = (summe * (zinsen / laufzeit)) + festeRate
        summe = summe - festeRate
        let zahlung = document.createElement("div")
        zahlung.innerText = x + ". Rate: " + rate.toFixed(2) + " €"
        ratendiv.appendChild(zahlung)
        x++
    }
    baseline2.innerText = "Monatl. feste Rate ohne Zinsen = <sup>Kreditsumme</sup>"
}

function faelligskeitsDarlehen(){
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100

    let rate = summe * (zinsen / laufzeit)
    let rategesammt = rate * laufzeit
    let zahlung = document.createElement("div")
    let zahlungGes = document.createElement("div")
    zahlung.innerText = "Monatliche Rate: " + rate.toFixed(2) + " €"
    zahlungGes.innerHTML = "Gesammte Zinsbelastung: " + rategesammt.toFixed(2) + " €"
    ratendiv.appendChild(zahlung)
    ratendiv.appendChild(zahlungGes)

    baseline2.innerText = "Gesamtsumme = Darlehenssumme + (Darlehenssumme * Zinssatz * 12)"
    baseline.innerText = "Gesamtsumme = " + summe + " + (" + summe + " * " + zinsen + " * 12)"
    zeile1.innerHTML = ""
    zeile2.innerHTML = ""
    zeile3.innerHTML = ""
    zeile4.innerHTML = ""
}


index()
