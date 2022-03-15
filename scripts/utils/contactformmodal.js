/* eslint-disable no-undef */
// modal event
// eslint-disable-next-line no-unused-vars
function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'

  // add tabindex0 on button close to be selectable
  btnCloseModal.setAttribute('tabindex', '0')

  // alert ('detect')
  main.setAttribute('aria-hidden', 'false')

  // add tabindex-1 on buttons&links out modal
  // document.getElementById('logo-link').setAttribute('tabindex','-1')
  btnContactButton.setAttribute('tabindex', '-1')
  document.getElementById('logo-link').setAttribute('tabindex', '-1')
  listbox.setAttribute('tabindex', '-1')
  document.getElementById('selected').setAttribute('tabindex', '-1')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '-1'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '-1'))

  // remove eventListener when modal is opened
  document.querySelectorAll('.fa-heart').forEach(elem => elem.removeEventListener('click', addLikeUpdate))
  document.querySelectorAll('.media-image').forEach(elem => elem.removeEventListener('click', lightbox))
  document.querySelector('.dropdown').removeEventListener('click', openDropdown)
  document.getElementById('logo-link').setAttribute('href', '#')
}

function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'

  main.setAttribute('aria-hidden', 'true')

  // add tabindex-1 on buttons&links out modal
  // document.getElementById('logo-link').setAttribute('tabindex','-1')
  btnContactButton.removeAttribute('tabindex')
  document.getElementById('logo-link').setAttribute('tabindex', '0')
  listbox.setAttribute('tabindex', '-1')
  document.getElementById('selected').setAttribute('tabindex', '0')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '0'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '0'))

  // re-add eventListener when modal is closed
  document.querySelectorAll('.fa-heart').forEach(elem => elem.addEventListener('click', addLikeUpdate))
  document.querySelectorAll('.media-image').forEach(elem => elem.addEventListener('click', lightbox))
  document.querySelector('.dropdown').addEventListener('click', openDropdown)
  document.getElementById('logo-link').setAttribute('href', 'index.html')
}

// Message validation form
// close modal message sent
// eslint-disable-next-line no-unused-vars
function closeModalMessageSent () {
  modalMessageSent.style.display = 'none'

  logoLink.setAttribute('tabindex', '0')
  listbox.setAttribute('tabindex', '0')
  document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '0'))
  document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '0'))
  document.querySelector('.contact_button').setAttribute('tabindex', '0')
}

// DOM Elements

const form = document.querySelector('form')
const formData = document.querySelectorAll('.formData')
// const close = document.querySelectorAll('.close')
const firstNameInput = document.getElementById('firstname')
const lastNameInput = document.getElementById('lastname')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('Yourmessage')
const modalMessageSent = document.querySelector('.modal-message-sent')
// eslint-disable-next-line no-unused-vars
const btnclose = document.querySelector('btnclose')

/* Conditions validation du formulaire ************************************************/
/* (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide */
let isFirstnameValid = false

function firstnameInputIsValid () {
  // resetGlobalErrorMessage()

  // eslint-disable-next-line no-useless-escape
  const regex = /^[a-zA-ZÀ-ÿ\ ]+$/ // uniquement des lettres minuscules, majuscules avec ou sans accent. Avec un espace pour les noms composés
  const value = firstNameInput.value.trim() // .trim permet de retirer les blancs en début et fin de chaîne
  if (value.length < 2 || regex.test(value) === false) {
    formData[0].setAttribute('data-error-visible', 'true') // formData[0] cible le premier element formData de HTML
    formData[0].setAttribute('data-error', 'Le prénom doit contenir au moins 2 lettres (sans caractères spéciaux).')
    formData[0].style.margin = '0px'
    isFirstnameValid = false
  } else {
    formData[0].setAttribute('data-error-visible', 'false')
    formData[0].removeAttribute('data-error')
    formData[0].style.margin = '0px 0px 26px 0px'
    isFirstnameValid = true
  }
}
formData[0].addEventListener('input', firstnameInputIsValid) // input = est déclenché de façon synchrone

/* (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide */
let isLastnameValid = false

function lastNameInputIsValid () {
  // resetGlobalErrorMessage()

  // eslint-disable-next-line no-useless-escape
  const regex = /^[A-Za-zÀ-ÿ\ ]+$/
  const value = lastNameInput.value.trim()
  if (value.length < 2 || regex.test(value) === false) {
    formData[1].setAttribute('data-error-visible', 'true')
    formData[1].setAttribute('data-error', 'Le nom doit contenir au moins 2 lettres (sans caractères spéciaux).')
    formData[1].style.margin = '0px'
    isLastnameValid = false
    // return false
  } else {
    formData[1].setAttribute('data-error-visible', 'false')
    formData[1].removeAttribute('data-error')
    formData[1].style.margin = '0px 0px 26px 0px'
    isLastnameValid = true
    // return true
  }
}
formData[1].addEventListener('input', lastNameInputIsValid)

/* (3) L'adresse électronique est valide ********************************************/
let isEmailValid = false

function emailInputIsValid () {
  // resetGlobalErrorMessage()

  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (regex.test(emailInput.value) === false) {
    formData[2].setAttribute('data-error-visible', 'true')
    formData[2].setAttribute('data-error', 'Veuillez indiquer un email valide.')
    formData[2].style.margin = '0px'
    isEmailValid = false
  } else {
    formData[2].setAttribute('data-error-visible', 'false')
    formData[2].removeAttribute('data-error')
    formData[2].style.margin = '0px 0px 26px 0px'
    isEmailValid = true
  }
}
formData[2].addEventListener('input', emailInputIsValid)

/* (4) Le champs message est requis ********************************************/

let isMessageValid = false

function messageInputIsValid () {
  if (messageInput.value === '') {
    formData[3].setAttribute('data-error-visible', 'true')
    formData[3].setAttribute('data-error', 'Veuillez remplir ce champ.')
    formData[3].style.margin = '0px'
    isMessageValid = false
  } else {
    formData[3].setAttribute('data-error-visible', 'false')
    formData[3].removeAttribute('data-error')
    formData[3].style.margin = '0px 0px 26px 0px'
    isMessageValid = true
  }
}
formData[3].addEventListener('input', messageInputIsValid)

// eslint-disable-next-line no-unused-vars
function validate (event) {
  event.preventDefault()
  firstnameInputIsValid()
  lastNameInputIsValid()
  emailInputIsValid()
  messageInputIsValid()

  if (isFirstnameValid &&
      isLastnameValid &&
      isEmailValid &&
      isMessageValid) {
    console.log(`Prénom: ${firstNameInput.value}`)
    console.log(`Nom: ${lastNameInput.value}`)
    console.log(`E-mail: ${emailInput.value}`)
    console.log(`Votre message: ${messageInput.value}`)

    form.reset()
    closeModal()
    modalMessageSent.style.display = 'block'

    document.getElementById('logo-link').setAttribute('tabindex', '-1')
    listbox.setAttribute('tabindex', '-1')
    selected.setAttribute('tabindex', '-1')
    document.querySelectorAll('.media-image').forEach(elem => elem.setAttribute('tabindex', '-1'))
    document.querySelectorAll('.fa-heart').forEach(elem => elem.setAttribute('tabindex', '-1'))
    btnContactButton.setAttribute('tabindex', '-1')
  }
}
