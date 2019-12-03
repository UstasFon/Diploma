import toastr from "toastr";

{
    const formFields = {
        nameInput: document.getElementById('name'),
        mailInput: document.getElementById('mail'),
        messageInput: document.getElementById('message'),

    };

    const wrongValidFields = {
        nameInput: {
            isValid: false,
            showError: false

        },
        mailInput:  {
            isValid: false,
            showError: false

        },
        messageInput:  {
            isValid: false,
            showError: false

        }
    };

    const formButton = document.querySelector('.form__button');
    let messageData = {};
    const userMessagedAPI = '/api/message';
    let isFormComplete = false;

    let messageSubmit = (e) => {
        e.preventDefault(e);
        saveMessageData();
        sendUserMessage();
};

    let removeWrongValidateMessage = (name) => {
        console.log(name)
        if (wrongValidFields[name].showError) {
            formFields[name].classList.remove('wrong-validation');
        }

    };

    let validateMessageForm = (name) => {
        const isNameValid = nameInputValidation();
        const isMailValid = mailInputValidation();
        const isMessageValid = messageValidate();
        const isFieldsValid = isNameValid && isMailValid && isMessageValid;
        
        if (wrongValidFields[name].isValid === false) {
            wrongValidateMessage();
        } else {
            removeWrongValidateMessage();
        }

        removeWrongValidateMessage(name);

        if (isFieldsValid !== isFormComplete) {
            isFormComplete = isFieldsValid;
            toggleButtonState(isFieldsValid);
        }

    };

    let toggleButtonState = (isFieldsValid) => {
        if (isFieldsValid) {
            formButton.removeAttribute('disabled');
            formButton.classList.remove('form__button_disabled');
        } else {
            formButton.setAttribute('disabled', 'disabled');
            formButton.classList.add('form__button_disabled');
        }
    };

    let saveMessageData = () => {
        let userName = formFields.nameInput.value.trim();
        let userMail = formFields.mailInput.value.trim();
        let userMessage = formFields.messageInput.value.trim();

        messageData.name = userName;
        messageData.maile = userMail;
        messageData.message = userMessage;
    };

    let sendUserMessage = () => {
        fetch(userMessagedAPI, {
                method: 'POST',
                body: JSON.stringify(messageData),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then((data) => {
                toastr.success('You message send!');
                messageCleaningInputs();
            })
            .catch((data) => {
                toastr.error('We fucked up. Try later');
            });
    };

    let messageCleaningInputs = () => {
        formFields.nameInput.value = "";
        formFields.mailInput.value = "";
        formFields.messageInput.value = "";
    };

    let nameInputValidation = () => {
        let nameInputTrim = formFields.nameInput.value.trim();
        let nameValidate = true;

        if (!nameInputTrim) {
            nameValidate = false;
            wrongValidFields.nameInput.isValid = false;
        } else {
            wrongValidFields.nameInput.isValid = true;
        }

        return nameValidate;
    };

    let wrongValidateMessage = (name) => {
        console.log(name);
        if (wrongValidFields[name].showError) {
            formFields[name].classList.add('wrong-validation');
        }
    };

    let mailInputValidation = () => {
        let mailTrim = formFields.mailInput.value.trim();
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let mailValidate = true;

        if (!reg.test(mailTrim)) {
            mailValidate = false;
            wrongValidFields.mailInput.isValid = false;
        } else {
            wrongValidFields.mailInput.isValid = true;
        }

        return mailValidate;
    };

    let messageValidate = () => {
        let mailTrim = formFields.messageInput.value.trim();
        let messageValidate = true;

        if (!mailTrim) {
            messageValidate = false;
            wrongValidFields.messageInput.isValid = false;
        } else {
            wrongValidFields.messageInput.isValid = true;
        }

        return messageValidate;
    };

    formFields.nameInput.oninput = validateMessageForm.bind(this, 'nameInput');
    formFields.nameInput.onblur = wrongValidateMessage.bind(this, 'nameInput');
    formFields.mailInput.oninput = validateMessageForm.bind(this, 'mailInput');
    formFields.mailInput.onblur = wrongValidateMessage.bind(this, 'mailInput');
    formFields.messageInput.oninput = validateMessageForm.bind(this, 'messageInput');
    formFields.messageInput.onblur = wrongValidateMessage.bind(this, 'messageInput');
    formButton.onclick = messageSubmit;

}