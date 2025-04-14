import "./pages/index.css";
import { initialCards } from "./components/cards";
import { removeCard, createCard, likeCard } from "./components/card";
import { closePopup, openPopup } from "./components/modal";

const cardList = document.querySelector(".places__list");
const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupButton = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const overlays = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__description");
const profilNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const profileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const newCardNameInput = cardPopup.querySelector(
  ".popup__input_type_card-name"
);
const newCardImageInput = cardPopup.querySelector(".popup__input_type_url");

function setImagePopup(
  popupElement,
  imageElement,
  captionElement,
  image,
  caption
) {
  imageElement.src = image;
  imageElement.alt = caption;
  captionElement.textContent = caption;
  openPopup(popupElement);
}

initialCards.forEach((element) => {
  const card = createCard(
    element,
    removeCard,
    likeCard,
    imagePopup,
    imagePopupPicture,
    imagePopupCaption,
    setImagePopup
  );
  cardList.append(card);
});

profilePopupButton.addEventListener("click", function () {
  profilNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileBio.textContent;
  openPopup(profilePopup);
});

cardPopupButton.addEventListener("click", function () {
  openPopup(cardPopup);
});

popupCloseButtons.forEach((element) => {
  element.addEventListener("click", function (evt) {
    closePopup(evt.target.closest(".popup"));
  });
});

overlays.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
    }
  });
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = profilNameInput.value;
  profileBio.textContent = profileDescriptionInput.value;
  closePopup(evt.target.closest(".popup"));
});

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = [
    {
      name: newCardForm.elements["place-name"].value,
      link: newCardForm.elements["link"].value,
    },
  ];
  newCard.forEach((element) => {
    const card = createCard(
      element,
      removeCard,
      likeCard,
      imagePopup,
      imagePopupPicture,
      imagePopupCaption,
      setImagePopup
    );
    cardList.prepend(card);
  });
  newCardForm.reset();
  closePopup(evt.target.closest(".popup"));
});
