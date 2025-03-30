let signinButtonteacher = document.getElementById("sign-in-teacher");
let signinStudent = document.getElementById("sign-in-student");

signinButtonteacher.addEventListener('click', async() => {
    const teacherEmail = document.getElementById("teacher-email-signin").value;
    const teacherPassword = document.getElementById("teacher-password-signin").value;

    if(!teacherEmail || !teacherPassword){
        alert("Please fill all of the fields")
    }

    const signInObj = {
        email: teacherEmail,
        password: teacherPassword
    };
    
    try{
        const response = await fetch("/teacherSignedin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signInObj)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            localStorage.setItem("accountName", data.name);
            window.location.href = "/dashboard";
        }
        else{
            alert(data.message);
        }
    }
    catch (err){
        console.error(`Error: ${err}`);
        alert("Soemthing went wrong while you're logging in!")
    }
});
