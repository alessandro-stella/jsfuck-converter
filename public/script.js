const inputField = document.getElementById("input");
const outputField = document.getElementById("output");
const outputLength = document.getElementById("length");
const addEval = document.getElementById("eval");

import allChars from "./allChars.js";

window.convertJSFUCK = () => {
    if (inputField.value.trim() === "") {
        return;
    }

    let normalString = inputField.value.trim().toLowerCase();

    const charArray = normalString
        .replace(/;/g, " ")
        .replace(/\s\s+/g, " ")
        .split("");

    if (charArray[charArray.length - 1] === " ") {
        charArray.pop();
    }

    let outputString = "(";
    let error = false;

    charArray.forEach((char, index) => {
        if (error !== false) {
            return;
        }

        if (allChars[char] === undefined) {
            error = char;
            return;
        }

        outputString += "(" + allChars[char] + ")";

        if (index !== charArray.length - 1) {
            outputString += "+";
        } else {
            outputString += ")";
        }
    });

    if (error) {
        outputField.value = `We're sorry, we couldn't convert the character "${error}"`;
        outputLength.innerHTML = "Length: 0";
        return;
    }

    if (addEval.checked) {
        outputString = allChars["evalString"] + outputString + "()";
    }

    outputField.value = outputString;
    outputLength.innerHTML = `Length: ${outputString.length}`;
};

window.copyResult = () => {
    outputField.select();
    outputField.setSelectionRange(0, 99999);

    document.execCommand("copy");

    alert("Copied the text: " + outputField.value);
};
