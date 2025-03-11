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

