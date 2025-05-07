function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupOnEsc);
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closePopup(popup);
  }
}

function cleanErrorMessages (popup) {
  const errors = popup.querySelectorAll('.popup__error');
  const inputs = popup.querySelectorAll('.popup__input')
  errors.forEach((element) => {
    element.textContent = '';
  });
  inputs.forEach((element) => {
    element.classList.remove('popup__input_not-valid');
  })
}

export { openPopup, closePopup, cleanErrorMessages };
