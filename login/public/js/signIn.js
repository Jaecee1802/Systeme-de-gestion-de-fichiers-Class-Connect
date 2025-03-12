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
            window.location.href = "";
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

signinStudent.addEventListener('click', async() => {
    const fillEmail = document.getElementById("studentEmail");
    const fillPassword = document.getElementById("studentPassword");

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
            body: JSON.stringify(studentObj)
        });

        const data = await response.json();

        if(response.ok){
            alert(data.message);
            window.location.href = "";
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