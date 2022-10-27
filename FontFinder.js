document.getElementById("button").addEventListener("click", rastgele);

function rastgele() {
  var random1 = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  //console.log(random);
  var birinciListe = [];
  var birinciRenk = "";
  var ikinciListe = [];
  var ikinciRenk = "";
  var degree = Math.floor(Math.random(random1.length) * 360);
  console.log(degree);
  for (var i = 0; i < 6; i++) {
    var bir = random1[Math.floor(Math.random(random1.length) * 16)];
    birinciListe.push(bir);
  }
  //console.log(birinciListe);
  for (var i = 0; i < birinciListe.length; i++) {
    birinciRenk += birinciListe[i];
  }
  console.log(birinciRenk);

  for (var i = 0; i < 6; i++) {
    var bir = random1[Math.floor(Math.random(random1.length) * 16)];
    ikinciListe.push(bir);
  }
  for (var i = 0; i < ikinciListe.length; i++) {
    ikinciRenk += ikinciListe[i];
  }
  console.log(ikinciRenk);
  //console.log(ikinciListe);
  document.getElementById("biriniciRenk").innerText = birinciRenk;
  document.getElementById("ikinciRenk").innerText = ikinciRenk;
  document.body.style.background = `linear-gradient(${degree}deg, #${birinciRenk}, #${ikinciRenk})`;
}
