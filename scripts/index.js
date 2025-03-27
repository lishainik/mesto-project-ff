// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



function removeCard() {}

function createCard(element) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardList = document.querySelector(".places__list");

  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__title").textContent = element.name;

  deleteButton.addEventListener("click", function () {
    const card = deleteButton.closest(".card");
    card.remove();
  });

  cardList.append(cardElement);
}

initialCards.forEach(createCard);
