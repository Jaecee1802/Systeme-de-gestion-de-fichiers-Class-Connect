const openModal = document.querySelector('#upload-button');
const closeModal = document.querySelector('#close-modal');
const modal = document.querySelector('#upload-modal');

openModal.addEventListener('click', () =>{
    modal.classList.add('is-active');
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
})

const openFolderModal = document.querySelector('#folder-button');
const closeFolderModal = document.querySelector('#close-folder-modal');
const folderModal = document.querySelector('#folder-modal');

openFolderModal.addEventListener('click', () => {
    folderModal.classList.add('is-active');
});

closeFolderModal.addEventListener('click', () => {
    folderModal.classList.remove('is-active');
});


