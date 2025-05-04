//Change Email Modal
const openEmailModal = document.getElementById('change-email');
const closeEmailModal = document.getElementById('close-email-modal');
const emailModal = document.getElementById('change-email-modal');

openEmailModal.addEventListener('click', () => {
    emailModal.classList.add('is-active');
});

closeEmailModal.addEventListener('click', () => {
    emailModal.classList.remove('is-active');
});

//Change Password Modal
const openPasswordModal = document.getElementById('change-password');
const closePasswordModal = document.getElementById('close-password-modal');
const passwordModal = document.getElementById('change-password-modal');

openPasswordModal.addEventListener('click', () => {
    passwordModal.classList.add('is-active');
});

closePasswordModal.addEventListener('click', () => {
    passwordModal.classList.remove('is-active');
});