import { generatePassword } from "./passwordGenerator.js";
import { getLastPassword, savePassword } from "./storage.js";

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');
const includeLowercaseEl = document.getElementById('include-lowercase');
const includeUppercaseEl = document.getElementById('include-uppercase');
const includeNumbersEl = document.getElementById('include-numbers');
const includeSymbolsEl = document.getElementById('include-symbols');


generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthEl.value);
    const url = urlEl.value;
    const includeLowercase = includeLowercaseEl.checked;
    const includeUppercase = includeUppercaseEl.checked;
    const includeNumbers = includeNumbersEl.checked;
    const includeSymbols = includeSymbolsEl.checked;

    const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    passwordEl.value = password;
    savePassword(password, url);
})

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordEl.value)
        .then( () => {
            alert('Password copied to clipboard');            
        })
        .catch(err => {
            console.error('Failed to copy text', err);
        });
})

window.addEventListener('load', () => {
    const lastPassword = getLastPassword();
    if (lastPassword) {
        passwordEl.value = lastPassword.password;
        urlEl.value = lastPassword.url || '';
    }
})