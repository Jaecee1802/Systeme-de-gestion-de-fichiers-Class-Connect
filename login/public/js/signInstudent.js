let signinStudent = document.getElementById("sign-in-student");

signinStudent.addEventListener('click', async() => {
    const fillEmail = document.getElementById("studentEmail").value;
    const fillPassword = document.getElementById("studentPassword").value;

    if(!fillEmail || !fillPassword){
        alert("Please fill all of the fields.");
    }

    const studentObj = {
        email: fillEmail,
        password: fillPassword
    }

    try{
        const response = await fetch("/studentSignin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentObj),
            credentials: "include"
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            localStorage.setItem("accountName", data.name);
            window.location.replace("/studentDashboard");
        }
        else{
            alert(data.message);
        }
    }
    catch(err){
        console.error(`Error: ${err}`);
        alert("Something went wrong while you're logging in!");
    }
})