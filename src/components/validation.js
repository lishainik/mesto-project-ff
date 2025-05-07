function checkForInvalidInputs(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function buttonStateToggle(inputList, buttonElement) {
  if (checkForInvalidInputs(inputList)) {
    buttonElement.classList.add("popup__button_not-valid");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__button_not-valid");
    buttonElement.removeAttribute("disabled", "");
  }
}

function setValidationEventListeners(formElement) {
  const inputs = Array.from(formElement.querySelectorAll(".popup__input"));
  const button = formElement.querySelector(".button");
  buttonStateToggle(inputs, button);
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      if (inputElement.validity.patternMismatch) {
        errorElement.textContent = `Разрешены только латинские и кириллические буквы, знаки дефиса и пробелы`;
        inputElement.classList.add("popup__input_not-valid");
      } else if (!inputElement.validity.valid) {
        errorElement.textContent = inputElement.validationMessage;
        inputElement.classList.add("popup__input_not-valid");
      } else {
        inputElement.classList.remove("popup__input_not-valid");
        errorElement.textContent = "";
      }
      buttonStateToggle(inputs, button);
    });
  });
  formElement.addEventListener("submit", function () {
    buttonStateToggle(inputs, button);
  });
}

function enableValidation() {
  const forms = Array.from(document.querySelectorAll(".popup__form"));
  forms.forEach((formElement) => {
    setValidationEventListeners(formElement);
  });
}

export { enableValidation, buttonStateToggle };
