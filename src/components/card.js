const cardTemplate = document.querySelector("#card-template").content;

const removeCard = function (evt) {
  const card = evt.target.closest(".card");
  card.remove();
};

const likeCard = function (evt) {
  evt.target.classList.add("card__like-button_is-active");
};

function createCard(element, removeFunc, likeFunc, imagePopup, imagePopupImg, imagePopupCaption, imagePopupFunc) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  likeButton.addEventListener("click", likeFunc);
  deleteButton.addEventListener("click", removeFunc);
  cardImage.addEventListener("click", () => imagePopupFunc(imagePopup, imagePopupImg, imagePopupCaption, element.link, element.name));

  return cardElement;
}

export { removeCard, createCard, likeCard };


//cardList.addEventListener("click", function (evt) {
//  if (evt.target.classList.contains("card__image")) {
//    imagePopupPicture.src = evt.target.src;
//    imagePopupPicture.alt = evt.target.alt;
//   imagePopupCaption.textContent = evt.target.alt;
//    openPopup(imagePopup);
//  }
//});