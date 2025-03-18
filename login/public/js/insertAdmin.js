let adminSeeder = document.getElementById("admin-seeder");

adminSeeder.addEventListener('click', async() => {
    const adminUsername = document.getElementById("adminUsername").value;
    const adminPassword = document.getElementById("adminPassword").value;

    if(!adminUsername || !adminPassword){
        alert("Please fill all of the fields.");
    };

    const adminObj = {
        username: adminUsername,
        password: adminPassword
    };

    try{
        const response = await fetch("/insertadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminObj)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            window.location.href = "/dashboard";
        }
        else{
            alert("data.message");
        }
    }
    catch(err){
        console.log(`Error: ${err}`);
        alert("Data cannot be inserted.")
    }
})