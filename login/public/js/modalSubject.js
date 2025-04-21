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

//Set Deadline Subject Folder Modal
const openDeadlineModal = document.getElementById('deadline-button');
const closeDeadlineModal = document.getElementById('close-deadline-modal');
const deadlineModal = document.getElementById('setdeadline-subject-folder-modal');

openDeadlineModal.addEventListener('click', () => {
    deadlineModal.classList.add('is-active');
})

closeDeadlineModal.addEventListener('click', () => {    
    deadlineModal.classList.remove('is-active');
});