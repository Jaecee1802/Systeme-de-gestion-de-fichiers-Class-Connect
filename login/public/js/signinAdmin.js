let adminSign = document.getElementById("sign-in-admin");

adminSign.addEventListener('click', async() => {
    adminUN = document.getElementById("adminUsername").value;
    adminPass = document.getElementById("adminPassword").value;

    const adminSignObj = {
        username: adminUN,
        password: adminPass
    };

    try{
        const response = await fetch("/adminsignedin", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminSignObj),
            credentials: "include"
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            window.location.replace("/adminDashboard");
        }
        else{
            alert(data.message);
        }
    }
    catch(err){
        console.error(err);
        alert("Something went wrong while you're logging in!");
    }
})