const eingabe = document.querySelector("#berechnen")
const ratendiv = document.querySelector("#monatsrate")
const rechnungen = document.getElementsByClassName("rechnung")
const baseline = document.getElementById("baseline")
const baseline2 = document.getElementById("baseline2")
const bruchwrapper = document.getElementById("bruchwrapper")
const zeile3= document.getElementById("zeile3")
const zeile4= document.getElementById("zeile4")
const zeile1 = document.getElementById("zeile1")
const zeile2 = document.getElementById("zeile2")
const beispielrechnung = document.querySelector("#beispielrechnung")
const zeile5= document.getElementById("zeile5")
const zeile6= document.getElementById("zeile6")
const baseline3 = document.getElementById("baseline3")
const zeile7= document.getElementById("zeile7")
const zeile8= document.getElementById("zeile8")
const baseline4 = document.getElementById("baseline4")
const zeile10= document.getElementById("zeile10")
const baseline5 = document.getElementById("baseline5")
const baseline6 = document.getElementById("baseline6")
const zeile14= document.getElementById("zeile14")
const baseline7 = document.getElementById("baseline7")

function index(){
    beispielrechnung.style.display = "none"

    eingabe.addEventListener("click", artauswahl)
}

function artauswahl(){
    ratendiv.innerHTML = ""
    beispielrechnung.style.display = "none"
    baseline.innerText = ""
    baseline2.innerText = ""
    zeile3.innerText = ""
    zeile4.innerText = ""
    zeile1.innerText = ""
    zeile1.innerText = ""
    zeile2.innerText = ""
    zeile6.innerText = ""
    baseline3.innerText = ""
    zeile8.innerText = ""
    baseline4.innerText = ""
    baseline5.innerText = ""
    baseline6.innerText = ""
    zeile14.innerText = ""
    baseline7.innerText = ""

   let auswahl = document.querySelector("#darlehensart").value

        if (auswahl === "annuitaetendarlehen" ){
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
    beispielrechnung.style.display = "flex"
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let kreditsumme = summe
    let zinsen = zinssatz / 100
    let festeRateNotFixed = summe / laufzeit
    let festeRate = parseInt(festeRateNotFixed.toFixed(2))
    let rate = 0
    let tilgungOhneZinsen = document.createElement("h3")
    tilgungOhneZinsen.innerText = "Feste monatl. Tilgungsrate ohne Zinsen: " + festeRate + " €"
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
    baseline2.innerText = "Monatl. feste Rate ohne Zinsen =  "
    zeile1.innerText = "Kreditsumme"
    zeile2.innerText = "Laufzeit"

    baseline.innerText = festeRate + " = " + kreditsumme + " / " + laufzeit

    baseline3.innerText = "1. Rate ="
    zeile6.innerText = "(Kreditsumme *  (Zinssatz / Laufzeit)) + Feste Rate"

    baseline4.innerText = "1. Rate ="
    zeile8.innerText = "(" + kreditsumme + " * (" + zinsen + " / " + laufzeit + ")) + " + festeRate

    baseline5.innerText = "Restsumme = Kreditsumme - Feste Rate"

    baseline6.innerText = "Restsumme = " + kreditsumme + " - " + festeRate

    baseline7.innerText = "2. Rate = "
    zeile14.innerText = "(Restsumme *  (Zinssatz / Laufzeit)) + Feste Rate"

}

function faelligskeitsDarlehen(){
    beispielrechnung.style.display = "flex"
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100

    let rate = summe * (zinsen / laufzeit)
    let rategesammt = rate * laufzeit
    let zahlung = document.createElement("div")
    let zahlungGes = document.createElement("div")
    let tilgungsZahlung = document.createElement("div")
    zahlung.innerText = "Monatliche Rate: " + rate.toFixed(2) + " €"
    zahlungGes.innerText = "Gesammte Zinsbelastung: " + rategesammt.toFixed(2) + " €"
    tilgungsZahlung.innerText = "Einmalige Tilungszahlung nach Ablauf der Laufzeit: " + summe
    ratendiv.appendChild(zahlung)
    ratendiv.appendChild(zahlungGes)
    ratendiv.appendChild(tilgungsZahlung)

    baseline2.innerText = "Monatliche Rate = Kreditsumme * (Zinssatz / laufzeit)"
    baseline.innerText = rate.toFixed(2) + " = " + summe + " * (" + zinsen + " / " + laufzeit + ")";
    baseline3.innerText = "Gesamte Zinsbelastung = Kreditsumme * Zinssatz"
    baseline4.innerText = rategesammt.toFixed(2) + " = " + summe + " * " + zinsen

}


index()
