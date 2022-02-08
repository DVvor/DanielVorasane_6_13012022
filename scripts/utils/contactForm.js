//modal event
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//Message validation form
function messageSent() {
    const modalMessageSent = document.querySelector(".modal-message-sent")
    modalMessageSent.style.display = "none";
}
messageSent()

//close modal message sent
function closeModalMessageSent() {
    modalMessageSent.style.display = "none";
}

//DOM Elements

const form = document.querySelector("form")
const formData = document.querySelectorAll(".formData");
const close = document.querySelectorAll(".close");
const firstnameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const modalMessageSent = document.querySelector(".modal-message-sent");
const btnclose = document.querySelector("btnclose");

/* Conditions validation du formulaire ************************************************/ 
/* (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide */
let isFirstnameValid = false;

function firstnameInputIsValid() { 
    // resetGlobalErrorMessage();
  
    let regex = /^[a-zA-ZÀ-ÿ\ ]+$/; // uniquement des lettres minuscules, majuscules avec ou sans accent. Avec un espace pour les noms composés
    let value = firstnameInput.value.trim(); //.trim permet de retirer les blancs en début et fin de chaîne
      if (value.length < 2 || regex.test(value) == false) {
        formData[0].setAttribute("data-error-visible","true"); // formData[0] cible le premier element formData de HTML
        formData[0].setAttribute("data-error","Le prénom doit contenir au moins 2 lettres (sans caractères spéciaux).");
        isFirstnameValid = false;
    } else {
        formData[0].setAttribute("data-error-visible","false");
        formData[0].removeAttribute("data-error");
      isFirstnameValid = true;
    }
  }
  formData[0].addEventListener("input", firstnameInputIsValid); // input = est déclenché de façon synchrone
  
/*(2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide */
  let isLastnameValid = false;
  
  function lastNameInputIsValid() {
    // resetGlobalErrorMessage();
  
    let regex = /^[A-Za-zÀ-ÿ\ ]+$/;
    let value = lastNameInput.value.trim(); 
      if (value.length < 2 || regex.test(value) == false) {
        formData[1].setAttribute("data-error-visible","true");
        formData[1].setAttribute("data-error","Le nom doit contenir au moins 2 lettres (sans caractères spéciaux).");
        isLastnameValid = false;
        // return false;
    } else {
      formData[1].setAttribute("data-error-visible","false");
      formData[1].removeAttribute("data-error");
      isLastnameValid = true;
      // return true;
    }
  }
  formData[1].addEventListener("input", lastNameInputIsValid); 
  
/* (3) L'adresse électronique est valide ********************************************/
  let isEmailValid = false;
  
  
  function emailInputIsValid() {
    // resetGlobalErrorMessage();
  
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (regex.test(emailInput.value) == false) {
        formData[2].setAttribute("data-error-visible","true");
        formData[2].setAttribute("data-error","Veuillez indiquer un email valide.");
        isEmailValid = false;
    } else {
        formData[2].setAttribute("data-error-visible","false");
        formData[2].removeAttribute("data-error");
      isEmailValid = true;
    }
  }
  formData[2].addEventListener("input", emailInputIsValid);


  function validate(event) {
    event.preventDefault();
    firstnameInputIsValid();
    lastNameInputIsValid();
    emailInputIsValid();
    
    
    if  (isFirstnameValid &&
        isLastnameValid &&
        isEmailValid)
     {
      form.reset();
      closeModal();
      modalMessageSent.style.display = "block";
     }
  } 

