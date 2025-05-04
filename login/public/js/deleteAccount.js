document.getElementById("delete-account").addEventListener("click", async () => {
    if (!confirm("Are you sure you want to delete your account? This action is irreversible.")) return;

    const res = await fetch("/delete-account", {
        method: "DELETE",
        credentials: "include"
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "/"; // redirect to login
});