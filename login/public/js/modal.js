//Upload Files Modal
const openModal = document.querySelector('#upload-button');
const closeModal = document.querySelector('#close-modal');
const modal = document.querySelector('#upload-modal');

openModal.addEventListener('click', () =>{
    modal.classList.add('is-active');
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
})

//Create Folder Modal
const openFolderModal = document.querySelector('#folder-button');
const closeFolderModal = document.querySelector('#close-folder-modal');
const folderModal = document.querySelector('#folder-modal');

openFolderModal.addEventListener('click', () => {
    folderModal.classList.add('is-active');
});

closeFolderModal.addEventListener('click', () => {
    folderModal.classList.remove('is-active');
});

//Delete Folder Modal
const openDeleteModal = document.querySelector('#delete-button');
const closeDeleteModal = document.querySelector('#close-delete-modal');
const deleteModal = document.querySelector('#delete-folder-modal');

openDeleteModal.addEventListener('click', () => {
    deleteModal.classList.add('is-active');
});

closeDeleteModal.addEventListener('click', () => {  
    deleteModal.classList.remove('is-active');
});

//Rename Folder Modal
const renameModal = document.querySelector('#rename-folder-modal');
const closeRenameModal = document.querySelector('#close-rename-modal');
const renameFolderInput = document.querySelector('#rename-folder-name');

let folderToRename = null; // store folder name globally for submission

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('rename-folder-btn')) {
        folderToRename = e.target.getAttribute('data-folder');
        // Optionally show it in placeholder or input
        renameFolderInput.placeholder = `Rename "${folderToRename}" to:`;
        renameModal.classList.add('is-active');
    }
});

closeRenameModal.addEventListener('click', () => {  
    renameModal.classList.remove('is-active');  
});
