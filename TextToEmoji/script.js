const encdecConBtn = document.querySelectorAll(".encdec-btns .btn");
const encryptCon = document.querySelector(
  ".encdec-container .encrypt-container"
);
const decryptCon = document.querySelector(
  ".encdec-container .decrypt-container"
);
const arrowSvg = document.querySelector("main h1 svg");

const resultCon = document.querySelector(".encdec-container .res-container");
resultCon.style.display = "none";

const encryptForm = document.getElementById("encrypt-form");
const decryptForm = document.getElementById("decrypt-form");

const icon = document.createElement("span");
icon.innerHTML = `<i class="fa-solid fa-copy"></i>`;
// icon.addEventListener('click', window.location.reload())

encdecConBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    encdecConBtn.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    updateContent(e);
  });
});
updateContent = (e) => {
  if (e.target.classList.contains("enc-btn")) {
    removeLeftOversDecrpt();
    encryptCon.style.display = "block";
    decryptCon.style.display = "none";
    arrowSvg.classList.remove("reverse");
    resultCon.style.display = "none";
  } else {
    removeLeftOversEncrypt();
    decryptCon.style.display = "block";
    encryptCon.style.display = "none";
    arrowSvg.classList.add("reverse");
    resultCon.style.display = "none";
  }
};

// const inputEle = document.querySelector('.encrypt-container form .form-group-ele textarea')
// console.log(inputEle)
// inputEle.addEventListener('keyup',() => {
//   console.log(34)
//   console.log(inputEle.value)
//   var text = inputEle;
//   // text.select();
//   navigator.clipboard.writeText(text.value)
// })

const random = (array) => array[~~(Math.random() * array.length)];

encryptForm.onsubmit = (e) => {
  e.preventDefault();

  const textIn = e.target["encrypttext"];
  const passIn = e.target["encryptpass"];

  checkDetails(textIn.value, passIn.value);

  const newTextIn = textIn.value.split("");
  let emojis = "";
  for (const val of newTextIn) {
    emojis += `&#128${val.charCodeAt(0)} `;
  }
  const pg = document.createElement("p");
  pg.innerHTML = emojis;
  resultCon.append(pg, icon);
  resultCon.style.display = emojis.length === 0 ? "none" : "block";
  var dataarr = JSON.parse(localStorage.getItem("data")) || [];
  dataarr.push({ pass: passIn.value, text: textIn.value, emojis: emojis });

  localStorage.setItem("data", JSON.stringify(dataarr));
};

decryptForm.onsubmit = (e) => {
  e.preventDefault();

  const emojisIn = decryptForm["decryptemojis"];
  const passIn = decryptForm["decryptpass"];

  checkDetails(emojisIn.value, passIn.value);

  const newEmojis = emojisIn.value.split(" ");
  let text2 = "";
  for (const val of newEmojis) {
    text2 += `&#${val.codePointAt(0)} `;
  }
  var dataarr = JSON.parse(localStorage.getItem("data"));
  var found;
  for (const arr of dataarr) {
    if (arr.emojis == text2 && passIn.value == arr.pass) {
      found = arr;
    }
  }
  // console.log(found)
  if (found.emojis === text2 && found.pass === passIn.value) {
    const pg = document.createElement("p");
    pg.innerHTML = found.text;
    resultCon.append(pg, icon);
    resultCon.style.display = found.emojis.length === 0 ? "none" : "block";
  }
};

function checkDetails(x, y) {
  if (!x || !y) {
    swal({
      icon: "error",
      text: "Enter all details",
      button: {
        text: "OK",
      },
      timer: 3000,
    });
    removeLeftOversEncrypt();
    removeLeftOversDecrpt();
  }
}

function removeLeftOversEncrypt() {
  encryptForm["encrypttext"].value = "";
  encryptForm["encryptpass"].value = "";
  resultCon.innerHTML = "";
}

function removeLeftOversDecrpt() {
  decryptForm["decryptemojis"].value = "";
  decryptForm["decryptpass"].value = "";
  resultCon.innerHTML = "";
}
