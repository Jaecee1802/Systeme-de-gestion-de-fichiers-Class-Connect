//Teacher
let tchrName = document.getElementById("teacherName");
let tchrEmail = document.getElementById("teacherEmail");
let tchrPassword = document.getElementById("teacherPass");
let retryPass = document.getElementById("teacherReEnter");
let signUpButt = document.getElementById("sign-up");

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

signUpButt.addEventListener('click', () => {
    const inputName = document.getElementById("teacherName").value;
    const inputEmail = document.getElementById("teacherEmail").value;
    const inputPassword = document.getElementById("teacherPassword").value;
    const inputReEnter = document.getElementById("teacherReEnter").value;

    console.log("Data:", {
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        reEnter: inputReEnter
    })
})

