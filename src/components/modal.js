function openPopup(target) {
  const popup = target;
  popup.classList.add("popup_is-opened");
  window.addEventListener("keydown", closePopupOnEsc);
}

function closePopup(evt) {
  const popup = evt.target.closest(".popup");
  popup.classList.remove("popup_is-opened");
}

function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    document
      .querySelector(".popup_is-opened")
      .classList.remove("popup_is-opened");
    window.removeEventListener("keydown", closePopupOnEsc);
  }
}

export { openPopup, closePopup };
