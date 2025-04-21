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

//Delete and Rename Modal
document.querySelectorAll('.dropdown-trigger button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = button.closest('.dropdown');
      dropdown.classList.toggle('is-active');
    });
  });
  
  window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.is-active').forEach(drop => drop.classList.remove('is-active'));
  });