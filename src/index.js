
import "./pages/index.css";
import { initialCards } from "./components/cards";
import { removeCard, createCard, likeCard } from "./components/card";
import { closePopup, openPopup, formSubmit } from "./components/modal";

const cardList = document.querySelector(".places__list");
const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupButton = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const overlay = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__description");
const nameField = document.querySelector(".popup__input_type_name");
const bioField = document.querySelector(".popup__input_type_description");
const profileForm = document.forms["edit-profile"];
const imageForm = document.forms["new-place"];
const newCardName = cardPopup.querySelector(".popup__input_type_card-name");
const newCardImage = cardPopup.querySelector(".popup__input_type_url");

initialCards.forEach((element) => {
  const card = createCard(element, removeCard, likeCard);
  cardList.append(card);
});

profilePopupButton.addEventListener("click", function () {
  nameField.value = profileName.textContent;
  bioField.value = profileBio.textContent;
  openPopup(profilePopup);
});

cardPopupButton.addEventListener("click", function () {
  openPopup(cardPopup);
});

popupCloseButtons.forEach((element) => {
  element.addEventListener("click", closePopup);
});

overlay.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(evt);
    }
  });
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = nameField.value;
  profileBio.textContent = bioField.value;
  closePopup(evt);
});

imageForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = [
    {
      name: imageForm.elements["place-name"].value,
      link: imageForm.elements["link"].value,
    },
  ];
  newCard.forEach((element) => {
    const card = createCard(element, removeCard, likeCard);
    cardList.prepend(card);
  });
  newCardName.value = "";
  newCardImage.value = "";
  closePopup(evt);
});

cardList.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("card__image")) {
    imagePopupPicture.src = evt.target.src;
    imagePopupPicture.alt = evt.target.alt;
    imagePopupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  }
});