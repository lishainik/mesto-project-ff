let removeCard = function (evt) {
  const card = evt.target.closest(".card");
  card.remove();
};

let likeCard = function (evt) {
  evt.target.classList.add("card__like-button_is-active");
};

function createCard(element, removeFunc, likeFunc) {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;

  likeButton.addEventListener("click", likeFunc);
  deleteButton.addEventListener("click", removeFunc);
  cardImage.addEventListener("click", function (evt) {});

  return cardElement;
}

export { removeCard, createCard, likeCard };
