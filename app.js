import { generatePassword } from "./passwordGenerator.js";
import { getLastPassword, savePassword } from "./storage.js";

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');
const includeLowercase = document.getElementById('include-lowercase').checked;
const includeUppercase = document.getElementById('include-uppercase').checked;
const includeNumbers = document.getElementById('include-numbers').checked;
const includeSymbols = document.getElementById('include-symbols').checked;


generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthEl.value);
    const url = urlEl.value;
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