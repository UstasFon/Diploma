let deliveredForm = document.querySelector('.delivered__mail');
let deliveredInput = document.querySelector('.delivered-mail__line');
let deliveredButton = document.querySelector('.delivered-mail__button');
let deliveredAPI = 'http://someAddres.net';

deliveredButton.onclick = delivered;

let delivered = (e)=> {
    e.preventDefault();
    ddeliveredValidate();
    deliveredSendMaile();
    deliveredClierInput();
};

let deliveredSendMaile = () => {
    let deliveredFormData = new FormData(deliveredForm);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", deliveredAPI);
    xhr.send(deliveredFormData);

};

let deliveredValidate = () => {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let address = deliveredInput.value;

    if(reg.test(address) == false) {
        alert('Enter the correct e-mail');
        inputWrongValidation();
        return false;
    }
};

let inputWrongValidation = () => {
    deliveredInput.classList = '.wrong-validation';
}

let deliveredClierInput = () => {
    deliveredInput.value = "";
};

