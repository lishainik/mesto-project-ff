import "./pages/index.css";
import { removeCard, createCard, likeAndUnlikeCard } from "./components/card";
import { closePopup, openPopup } from "./components/modal";
import { enableValidation, cleanErrorMessages } from "./components/validation";
import {
  getCards,
  getUserInfo,
  updateProfile,
  sendCard,
  updateAvatar,
} from "./components/api";
const validationSet = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inactiveButtonClass: "popup__button_not-valid",
  submitButtonSelector: ".popup__button",
  errorClass: "popup__input_not-valid",
  errorSelector: ".popup__error",
};
const cardList = document.querySelector(".places__list");
const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarPopupButton = document.querySelector(".profile__image");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const cardPopup = document.querySelector(".popup_type_new-card");
const cardPopupButton = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupPicture = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const overlays = document.querySelectorAll(".popup");
const profileName = document.querySelector(".profile__title");
const profileBio = document.querySelector(".profile__description");
const profilePicture = document.querySelector(".profile__image");
const profileNameInput = document.querySelector(".popup__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const linkInput = document.querySelector(".popup__input_type_avatar-url");
const profileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const avatarForm = document.forms["update-avatar"];
const newCardNameInput = cardPopup.querySelector(
  ".popup__input_type_card-name"
);

function getMyInfo() {
  let myId;
  getUserInfo()
    .then((res) => {
      profileName.textContent = res.name;
      profileBio.textContent = res.about;
      profilePicture.style = `background-image: url('${res.avatar}')`;
      myId = res._id;
      return myId;
    })
    .then(() => {
      loadCards(myId);

      return myId;
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadCards(id) {
  getCards()
    .then((res) => {
      const initialCards = Array.from(res);
      initialCards.forEach((element) => {
        const card = createCard(
          element,
          removeCard,
          likeAndUnlikeCard,
          id,
          openPopup,
          imagePopup
        );
        cardList.append(card);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function loadingRender(isLoading, loadingElement) {
  if (isLoading) {
    loadingElement.textContent = "Сохраняется...";
  } else {
    loadingElement.textContent = "Cохранить";
  }
}

avatarPopupButton.addEventListener("click", function () {
  openPopup(avatarPopup);
});

profilePopupButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileBio.textContent;
  cleanErrorMessages(
    profilePopup,
    validationSet.inputSelector,
    validationSet.errorSelector,
    validationSet.errorClass
  );
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

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const button = avatarForm.querySelector(".popup__button");
  const link = linkInput.value;
  loadingRender(true, button);
  updateAvatar(linkInput.value)
    .then((res) => {
      profilePicture.style = `background-image: url('${link}')`;
      closePopup(evt.target.closest(".popup"));
    })
    .finally(() => {
      loadingRender(false, button);
    });
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const button = profileForm.querySelector(".popup__button");
  loadingRender(true, button);
  updateProfile(profileNameInput.value, profileDescriptionInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileBio.textContent = res.about;
      closePopup(evt.target.closest(".popup"));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loadingRender(false, button);
    });
});

newCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const button = newCardForm.querySelector(".popup__button");
  loadingRender(true, button);
  const name = newCardForm.elements["place-name"].value;
  const link = newCardForm.elements["link"].value;
  sendCard(name, link)
    .then((res) => {
      const card = createCard(
        res,
        removeCard,
        likeAndUnlikeCard,
        res.owner._id
      );
      cardList.prepend(card);
    })
    .then(() => {
      newCardForm.reset();
      closePopup(evt.target.closest(".popup"));
      loadingRender(false, button);
    })
    .catch((err) => {
      console.log(err);
    });
});

enableValidation(validationSet);

getMyInfo();
