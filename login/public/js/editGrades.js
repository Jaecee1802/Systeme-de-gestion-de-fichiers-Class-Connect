editActivityForm = document.getElementById("edit-grade-student-form");

editActivityForm.addEventListener('submit', async function(event){
    event.preventDefault();

    const activityName = document.getElementById("edit-activity-select").value;
    const editGrade = document.getElementById("edit-grade-fill").value;
    const editOverallGrade = document.getElementById("edit-overall-grade-fill").value;

    if (activityName === "Select Activity") {
        alert("Please select an activity");
        return;
    }

    const response = await fetch('/editGrades', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({activityName, editGrade, editOverallGrade})
    });

    const data = await response.json();
    alert(data.message);
})

async function loadActivitiesinDropdown(){
    try{
        const response = await fetch('/activitieslist');
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('edit-activity-select');
            select.innerHTML = `<option>Select Activity</option>`;
        
            data.activities.forEach(activity => {
                const option = document.createElement('option');
                option.value = activity.activityname;
                option.textContent = activity.activityname;
                select.appendChild(option);
            })
        }
        else{
            alert('Failed to load folders');
            console.log('Failed to load folders');
        }
    }
    catch (err){
        console.error(`error loading activities: ${err}`);
    }
}