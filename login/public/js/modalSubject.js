//Download File Modal
const openDownloadFile = document.getElementById('download-file-button');
const closeDownloadFile = document.getElementById('close-download-file-modal');
const downloadFile = document.getElementById('download-file-modal');

openDownloadFile.addEventListener('click', () => {
    downloadFile.classList.add('is-active');
});

closeDownloadFile.addEventListener('click', () => {
    downloadFile.classList.remove('is-active');
})

//Create Subject Folder Modal
const openFolderModal = document.getElementById('folder-button');
const closeFolderModal = document.getElementById('close-folder-modal');
const folderModal = document.getElementById('subject-folder-modal');

openFolderModal.addEventListener('click', () => {
    folderModal.classList.add('is-active');
});

closeFolderModal.addEventListener('click', () => {
    folderModal.classList.remove('is-active');
});

//Delete Subject Folder Modal
const openDeleteModal = document.getElementById('delete-button');
const closeDeleteModal = document.getElementById('close-delete-modal');
const deleteModal = document.getElementById('delete-subject-folder-modal');

openDeleteModal.addEventListener('click', () => {
    deleteModal.classList.add('is-active');
});

closeDeleteModal.addEventListener('click', () => {  
    deleteModal.classList.remove('is-active');
});

//Rename Subject Folder Modal
const openRenameModal = document.getElementById('rename-button');
const closeRenameModal = document.getElementById('close-rename-modal');
const renameModal = document.getElementById('rename-subject-folder-modal');

openRenameModal.addEventListener('click', () => {
    renameModal.classList.add('is-active');
})

closeRenameModal.addEventListener('click', () => {
    renameModal.classList.remove('is-active');
})

//Deadline Subject Folder Modal
const openDeadlineModal = document.getElementById('deadline-file-button');   
const closeDeadlineModal = document.getElementById('close-deadline-modal');
const deadLineModal = document.getElementById('setdeadline-folder-modal');

openDeadlineModal.addEventListener('click', () => {
    deadLineModal.classList.add('is-active');
})

closeDeadlineModal.addEventListener('click', () => {
    deadLineModal.classList.remove('is-active');
})
