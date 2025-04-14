//Upload Files Modal
const openModal = document.getElementById('upload-subject-file-button');
const closeModal = document.getElementById('close-upload-file-modal');
const modal = document.getElementById('upload-modal');

openModal.addEventListener('click', () =>{
    modal.classList.add('is-active');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
});

//Rename Files Modal 
const openRenameFile = document.getElementById('rename-subject-file-button');
const closeRenameFile = document.getElementById('close-file-modal');
const renameFile = document.getElementById('rename-file-modal');

openRenameFile.addEventListener('click', () => {
    renameFile.classList.add('is-active');
});

closeRenameFile.addEventListener('click', () => {
    renameFile.classList.remove('is-active');
});

//Delete File Modal 
const openDeleteFile = document.getElementById('delete-subject-file-button');
const closeDeleteFile = document.getElementById('close-file-delete-modal');
const deleteFile = document.getElementById('delete-file-modal');

openDeleteFile.addEventListener('click', () => {
    deleteFile.classList.add('is-active');
});

closeDeleteFile.addEventListener('click', () => {
    deleteFile.classList.remove('is-active');
})


//Download File Modal
const openDownloadFile = document.getElementById('download-subject-file-button');
const closeDownloadFile = document.getElementById('close-download-file-modal');
const downloadFile = document.getElementById('download-file-modal');

openDownloadFile.addEventListener('click', () => {
    downloadFile.classList.add('is-active');
});

closeDownloadFile.addEventListener('click', () => {
    downloadFile.classList.remove('is-active');
})
