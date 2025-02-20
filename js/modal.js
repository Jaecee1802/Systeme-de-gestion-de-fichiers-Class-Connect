const openModal = document.querySelector('#upload-button');
const closeModal = document.querySelector('#close-modal');
const modal = document.querySelector('#upload-modal');

openModal.addEventListener('click', () =>{
    modal.classList.add('is-active');
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
})