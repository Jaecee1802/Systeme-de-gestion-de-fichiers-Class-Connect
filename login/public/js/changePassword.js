changePassForm = document.getElementById('change-password-form');

changePassForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/changePassword', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({password: newPassword})
    });

    const data = await response.json();
    alert(data.message);
})