import { deleteCard, sendLike, deleteLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const removeCard = function (evt, id) {
  deleteCard(id)
    .then(() => {
      const card = evt.target.closest(".card");
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeAndUnlikeCard = function (evt, id, counter) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(id).then((res) => {
      evt.target.classList.remove("card__like-button_is-active");
      counter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  } else {
    sendLike(id).then((res) => {
      evt.target.classList.add("card__like-button_is-active");
      counter.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }
};

function createCard(
  element,
  removeFunc,
  likeFunc,
  id,
  popupFunc,
) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__likes-counter");
  const likeArr = element.likes;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  likeCounter.textContent = element.likes.length;

  cardElement.querySelector(".card__title").textContent = element.name;
  if (element.owner._id === id) {
    deleteButton.addEventListener("click", (evt) =>
      removeFunc(evt, element._id)
    );
  } else {
    deleteButton.style.display = "none";
  }
  if (likeArr.find(({ _id }) => _id === id)) {
    likeButton.classList.add("card__like-button_is-active");
    likeButton.addEventListener("click", (evt) =>
      likeFunc(evt, element._id, likeCounter)
    );
  } else {
    likeButton.addEventListener("click", (evt) =>
      likeFunc(evt, element._id, likeCounter)
    );
  }
  cardImage.addEventListener("click", (evt) => popupFunc(element.link, element.name));
  return cardElement;
}

export { removeCard, createCard, likeAndUnlikeCard };
