//Student
let studButton = document.getElementById("student-sign-up");

//Sign-up FETCH for students//
studButton.addEventListener('click', async() => {
    const inputName = document.getElementById("studentName").value;
    const inputEmail = document.getElementById("studentEmail").value;
    const inputID = document.getElementById("studentID").value;
    const inputPassword = document.getElementById("studentPassword").value;
    const retryPass = document.getElementById("studentRetryPass").value;
    const course = document.getElementById("ddown-trigger").querySelector("span").textContent;
    const section = document.getElementById("studentSection").value;

    if(!inputName || !inputEmail || !inputID || !inputPassword || !retryPass || course === "Choose Course" || !section){
        alert("Please fill all the fields.");
        return;
    }

    if(inputPassword !== retryPass){
        alert("Password does not match!");
        return;
    }

    if(!section){
        alert("Please enter your section.");
        return;
    }

    const studentObj = {
        name: inputName,
        email: inputEmail,
        studentID: inputID,
        password: inputPassword,
        course: course,
        section: section
    };

    try{
        const response = await fetch("http://localhost:3000/studentsignup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentObj)
        });

        const data = await response.json();

        if(response.ok){
            alert("Successfully signed up!");
        }
        else{
            alert("Error: " + data.message);
        }
    }
    catch(error){
        console.log(error);
        alert("Something went wrong!");
    }
})
//Sign-up FETCH for students//