let box = document.getElementById("box");
let codeScreen = document.querySelector(".code-screen");
let inputs = document.querySelectorAll(".sliders input");
document.getElementById('shadow-inset').addEventListener("input", generateShadow);

inputs.forEach((inp) => inp.addEventListener("input", generateShadow));

function generateShadow(e) {
    if(e != undefined && e.target.id != 'shadow-inset') setInputs(e);
    let hShadow = document.getElementById("h-shadow").value;
    let vShadow = document.getElementById("v-shadow").value;
    let blurRadius = document.getElementById("blur-radius").value;
    let spreadRadius = document.getElementById("spread-radius").value;
    let shadowColor = document.getElementById("shadow-color").value;
    let shadowColorOpacity = document.getElementById("shadow-color-opacity").value;
    let shadowInset = document.getElementById("shadow-inset").checked;

    let rgba = hexToRgba(shadowColor, shadowColorOpacity);
    let boxShadow = `${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgba}`
    
    boxShadow = shadowInset ? `inset ${boxShadow}` : boxShadow;

    box.style.boxShadow = boxShadow;

    codeScreen.innerHTML = `box-shadow: ${boxShadow};`;
}

function hexToRgba(shadowColor, shadowColorOpacity){
    let r = parseInt(shadowColor.substr(1,2), 16);
    let g = parseInt(shadowColor.substr(3,2), 16);
    let b = parseInt(shadowColor.substr(5,2), 16);
    return `rgba(${r}, ${g}, ${b}, ${shadowColorOpacity})`;
}
document.querySelector(".code-wrapper button").addEventListener('click',() => {
    codeScreen.select();
    document.execCommand("copy");
    alert("Code Copied To Clipboard");
})

function setInputs(e) {
    let id = e.target.id;
    if(id[id.length-2] == 'I') {
        const range = e.target.parentElement.parentElement.lastElementChild;
        range.value = e.target.value;
    } else {
        const field = e.target.parentElement.querySelector('.slider-wrapper label input');
        field.value = e.target.value;
    }
}

window.onload = generateShadow();