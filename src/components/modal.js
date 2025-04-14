function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown',closePopupOnEsc )
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown',closePopupOnEsc )
}


function setImagePopup (popupElement, imageElement, captionElement, image, caption) {
imageElement.src = image;
imageElement.alt = caption
captionElement.textContent = caption;
openPopup(popupElement)
}


function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened")
    closePopup(popup);
  }
}

export { openPopup, closePopup, setImagePopup };
