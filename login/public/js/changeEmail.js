changeEmailForm = document.getElementById("change-email-form");

changeEmailForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const newEmail = document.getElementById('new-email').value;

    const response = await fetch('/changeEmail', {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({email: newEmail})
    });

    const data = await response.json();
    alert(`Email is changed. ${data.message}`);
})