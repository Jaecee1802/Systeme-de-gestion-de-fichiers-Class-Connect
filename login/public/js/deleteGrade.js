deleteActivityForm = document.getElementById("delete-activity-form");

deleteActivityForm.addEventListener('submit', async function(event){
    event.preventDefault();

    const activityName = document.getElementById("delete-activity-select").value;

    if (activityName === "Select Activity") {
        alert("Please select an activity");
        return;
    }

    const response = await fetch('/deleteGrades', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({activityName})
    });

    const data = await response.json();
    alert(data.message);
})