import { deleteCard, sendLike, deleteLike} from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const removeCard = function (evt, id) {
  deleteCard(id)
  const card = evt.target.closest(".card");
  card.remove();
};

const likeAndUnlikeCard = function (evt, id, counter) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(id)
  evt.target.classList.remove("card__like-button_is-active");
  counter.textContent =  parseInt(counter.textContent) - 1
  } else {
    sendLike(id)
  evt.target.classList.add("card__like-button_is-active");
  counter.textContent = parseInt(counter.textContent) + 1
  }
  
};



function createCard(element, removeFunc, likeFunc, imagePopup, imagePopupImg, imagePopupCaption, imagePopupFunc, id) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__likes-counter")
  const likeArr = element.likes
  cardImage.src = element.link;
  cardImage.alt = element.name;
  likeCounter.textContent = element.likes.length;
  
  
  cardElement.querySelector(".card__title").textContent = element.name;
  if (element.owner._id === id) {
  
    deleteButton.addEventListener("click", (evt) => removeFunc(evt, element._id));
  } else {
    deleteButton.style.display = 'none';
  }
  if (likeArr.find(({_id}) => _id === id)) {
    likeButton.classList.add("card__like-button_is-active")
    likeButton.addEventListener("click", (evt) => likeFunc(evt, element._id, likeCounter));
  } else {   
  likeButton.addEventListener("click", (evt) => likeFunc(evt, element._id, likeCounter));
  }

  
  cardImage.addEventListener("click", () => imagePopupFunc(imagePopup, imagePopupImg, imagePopupCaption, element.link, element.name));

  return cardElement;
}

export { removeCard, createCard, likeAndUnlikeCard };


//cardList.addEventListener("click", function (evt) {
//  if (evt.target.classList.contains("card__image")) {
//    imagePopupPicture.src = evt.target.src;
//    imagePopupPicture.alt = evt.target.alt;
//   imagePopupCaption.textContent = evt.target.alt;
//    openPopup(imagePopup);
//  }
//});