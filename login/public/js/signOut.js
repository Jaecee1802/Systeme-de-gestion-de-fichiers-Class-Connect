let signOut = document.getElementById('sign-out');

signOut.addEventListener('click', async (e) => {
    e.preventDefault();

    try{
        const response = await fetch("/signout", {
            method: "POST",
            headers: {
                "Content-Type": 'text/html',
            }
        });

        if(response.ok){
            alert("You're signed out!");
            window.location.href = "/";
        }
        else{
            alert("Something went wrong!");
        }
    }

    catch(err){
        console.error(err);
        alert("An error occurred while signing out.");
    }
});