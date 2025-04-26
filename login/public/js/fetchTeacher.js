//Teacher
let signUpButt = document.getElementById("teacher-sign-up");

//Sign-up FETCH for teachers//
signUpButt.addEventListener('click', async() => {
    const inputName = document.getElementById("teacherName").value;
    const inputEmail = document.getElementById("teacherEmail").value;
    const inputPassword = document.getElementById("teacherPass").value;
    const inputReEnter = document.getElementById("teacherReEnter").value;
    const department = document.getElementById("ddown-trigger").querySelector("span").textContent;

    if (!inputName || !inputEmail || !inputPassword || !inputReEnter || department === "Choose Department") {
        alert("Please fill all the fields.");
        return;
    }

    if(inputPassword !== inputReEnter){
        alert("Password does not match!");  
        return;
    }

    const teacherObj = {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        department: department
    };

    try{
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherObj),
            credentials: "include"
        });

        const data = await response.json();

        if(response.ok){
            alert("Successfully signed up!");
            localStorage.setItem("accountName", data.name);
            window.location.replace("/dashboard");
        }
        else{
            alert("Error: " + data.message);
        }
    }
    catch(error){
        console.log(error);
        alert("Something went wrong!");
    }
});
//Sign-up FETCH for teachers//