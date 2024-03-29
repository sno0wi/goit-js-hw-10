import izitoast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const form = document.querySelector("form");
form.addEventListener("submit", submitForm);
const delayInput = document.querySelector('input[name="delay"]');
const radioBtns = document.querySelectorAll('input[name="state"]');

function submitForm(event) {
    event.preventDefault();

    const delayValue = Number(delayInput.value);
    
    let selectedStateBtn;
    radioBtns.forEach(radioBtn => {
        if (radioBtn.checked) {
            selectedStateBtn = radioBtn.value;
        }
    });

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedStateBtn === "fulfilled") {
                resolve(delayValue);
            } else {
                reject(delayValue);
            }
        }, delayValue);
    });

    promise
        .then((delayValue) => {
            izitoast.success({
                message: `Fulfilled promise in ${delayValue}ms`
            });
        })
        .catch((delayValue) => {
            izitoast.error({
                message: `Rejected promise in ${delayValue}ms`
            });
        })
    resetForm();
}

function resetForm(){
    form.reset();
}