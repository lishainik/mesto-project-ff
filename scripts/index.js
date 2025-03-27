// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector(".places__list");

let removeCard = function(evt) {
    const card = evt.target.closest(".card");
    card.remove();
}

function createCard(element) {
  const cardTemplate = document.querySelector("#card-template").content;

  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = element.link;
  cardImage.alt = `Изображение места ${element.name}`;
  cardElement.querySelector(".card__title").textContent = element.name;

  deleteButton.addEventListener ('click', removeCard)

  return cardElement;
}

initialCards.forEach((element) => {
  const card = createCard(element);
  cardList.append(card);
});
