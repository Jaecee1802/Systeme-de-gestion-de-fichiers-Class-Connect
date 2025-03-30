document.addEventListener("DOMContentLoaded", () => {
    const accountName = localStorage.getItem("accountName");
    if (accountName) {
        document.getElementById("account-name").textContent = accountName;
    }
});