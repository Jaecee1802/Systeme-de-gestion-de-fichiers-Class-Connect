//Record Grades Modal 
const openGradeModal = document.getElementById('addgrade-button');
const closeGradeModal = document.getElementById('close-addgrade-modal');
const GraderModal = document.getElementById('record-grades-modal');

openGradeModal.addEventListener('click', () => {
    GraderModal.classList.add('is-active');
});

closeGradeModal.addEventListener('click', () => {
    GraderModal.classList.remove('is-active');
});

//Edit Grades Modal
const openEditGradeModal = document.getElementById('editgrade-button');
const closeEditGradeModal = document.getElementById('close-editgrade-modal');
const EditGraderModal = document.getElementById('edit-grades-modal');

openEditGradeModal.addEventListener('click', () => {
    EditGraderModal.classList.add('is-active');
});

closeEditGradeModal.addEventListener('click', () => {
    EditGraderModal.classList.remove('is-active');
});

const openDeleteGradeModal = document.getElementById('deletegrade-button');
const closeDeleteGradeModal = document.getElementById('close-deletegrade-modal');
const DeleteGraderModal = document.getElementById('delete-grades-modal');

openDeleteGradeModal.addEventListener('click', () => {
    DeleteGraderModal.classList.add('is-active');
});

closeDeleteGradeModal.addEventListener('click', () => {
    DeleteGraderModal.classList.remove('is-active');
});