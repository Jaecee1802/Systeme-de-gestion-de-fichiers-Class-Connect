//Create Folder Modal
const openFolderModal = document.getElementById('folder-button');
const closeFolderModal = document.getElementById('close-folder-modal');
const folderModal = document.getElementById('folder-modal');

openFolderModal.addEventListener('click', () => {
    folderModal.classList.add('is-active');
});

closeFolderModal.addEventListener('click', () => {
    folderModal.classList.remove('is-active');
});

//Delete Folder Modal
const openDeleteModal = document.getElementById('delete-button');
const closeDeleteModal = document.getElementById('close-delete-modal');
const deleteModal = document.getElementById('delete-folder-modal');

openDeleteModal.addEventListener('click', () => {
    deleteModal.classList.add('is-active');
});

closeDeleteModal.addEventListener('click', () => {  
    deleteModal.classList.remove('is-active');
});

//Rename Folder Modal
const openRenameModal = document.getElementById('rename-button');
const closeRenameModal = document.getElementById('close-rename-modal');
const renameModal = document.getElementById('rename-folder-modal');

openRenameModal.addEventListener('click', () => {
    loadFoldersInDropdown();
    renameModal.classList.add('is-active');
})

closeRenameModal.addEventListener('click', () => {
    renameModal.classList.remove('is-active');
})
