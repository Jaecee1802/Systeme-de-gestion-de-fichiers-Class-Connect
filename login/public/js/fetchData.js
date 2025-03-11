// DROPDOWN

document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("dropDown");
    const trigger = document.getElementById("ddown-trigger");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-item");

    trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.classList.toggle("is-active");
    })

    dropdownItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            trigger.querySelector("span").textContent = item.textContent; 
            dropdown.classList.remove('is-active'); 
        });
    });

    document.addEventListener("click", (event) => {
        if(!dropdown.contains(event.target)){
            dropdown.classList.remove("is-active");
        }
    })
})

//DROPDOWN

//Teacher
let tchrName = document.getElementById("teacherName");
let tchrEmail = document.getElementById("teacherEmail");
let tchrPassword = document.getElementById("teacherPass");
let retryPass = document.getElementById("teacherReEnter");
let signUpButt = document.getElementById("sign-up");

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
        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherObj)
        });

        const data = response.json();

        if(response.ok){
            alert("Successfully signed up!");
            window.location.href = "";
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
