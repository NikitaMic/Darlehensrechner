let eingabe = document.querySelector("#berechnen")
let ratendiv = document.querySelector("#monatsrate")

function index(){
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
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let monatsrate = (summe * (((1 + (zinsen / 12)) ** (laufzeit) * zinsen) / ((1 + (zinsen / 12)) ** (laufzeit) - 1))) / 12
    ratendiv.innerText = monatsrate.toFixed(2) + "€"
}

function tilgungsDarlehen() {
    let laufzeit = parseInt(document.getElementById("laufzeit").value)
    let zinssatz = parseInt(document.querySelector("#zinssatz").value)
    let summe = parseInt(document.querySelector("#summe").value)
    let zinsen = zinssatz / 100
    let festeRate = summe / laufzeit
    let rate = 0
    let tilgungOhneZinsen = document.createElement("h3")
    tilgungOhneZinsen.innerText = "Feste Tilgungsrate ohne Zinsen: " + festeRate.toFixed(2) + " €"
    ratendiv.appendChild(tilgungohnezinsen)
    let x = 1

    while (summe > 0) {
        rate = (summe * (zinsen / laufzeit)) + festeRate
        summe = summe - festeRate
        let zahlung = document.createElement("div")
        zahlung.innerText = x + ". Rate: " + rate.toFixed(2) + " €"
        ratendiv.appendChild(zahlung)
        x++
    }
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
}


index()
