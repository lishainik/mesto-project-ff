function checkForInvalidInputs(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function buttonStateToggle(inputList, buttonElement, inactiveButtonClass) {
  if (checkForInvalidInputs(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
}

function setValidationEventListeners(formElement, inactiveButtonClass, inputElements, buttonElement, errorClass) {
  const inputs = Array.from(formElement.querySelectorAll(`${inputElements}`));
  const button = formElement.querySelector(`${buttonElement}`);
  buttonStateToggle(inputs, button, inactiveButtonClass);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      if (inputElement.validity.patternMismatch) {
        errorElement.textContent = `Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы`;
        inputElement.classList.add(errorClass);
      } else if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add(errorClass);
      } else {
        inputElement.classList.remove(errorClass);
        errorElement.textContent = "";
      }
      buttonStateToggle(inputs, button, inactiveButtonClass);
    });
  });
  formElement.addEventListener("submit", function () {
    buttonStateToggle(inputs, button);
  });
}

function cleanErrorMessages (popup, inputSelector, errorSelector, errorClass ) {
  const errors = popup.querySelectorAll(`${errorSelector}`);
  const inputs = popup.querySelectorAll(`${inputSelector}`)
  errors.forEach((element) => {
    element.textContent = '';
  });
  inputs.forEach((element) => {
    element.classList.remove(errorClass);
  })
}

function enableValidation(validationSet) {
  const forms = Array.from(document.querySelectorAll(`${validationSet.formSelector}`));
  forms.forEach((formElement) => {
    setValidationEventListeners(formElement, validationSet.inactiveButtonClass, validationSet.inputSelector, validationSet.submitButtonSelector, validationSet.errorClass);
  });
}

export { enableValidation, buttonStateToggle, cleanErrorMessages };
