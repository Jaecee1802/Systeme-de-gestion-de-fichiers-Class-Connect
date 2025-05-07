// Get studentID from URL
const urlparams = new URLSearchParams(window.location.search);
const studentid = urlparams.get('studentID');

// Form submission logic
const deleteActivityForm = document.getElementById("delete-activity-form");

deleteActivityForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const activityName = document.getElementById("delete-activity-select").value;

    if (activityName === "Select Activity") {
        alert("Please select an activity");
        return;
    }

    const response = await fetch('/deleteGrades', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityName, studentid })
    });

    const data = await response.json();
    alert(data.message);

});

// Load activities for the student
async function loadActivitiesinDropdown(studentid) {
    try {
        // Make sure the route name matches
        const response = await fetch(`/getActivitiesForDelete?studentID=${studentid}`);
        const data = await response.json();

        if (data.success) {
            const select = document.getElementById('delete-activity-select');
            select.innerHTML = `<option>Select Activity</option>`;

            data.activities.forEach(activity => {
                const option = document.createElement('option');
                option.value = activity.activityname;
                option.textContent = activity.activityname;
                select.appendChild(option);
            });
        } else {
            alert('Failed to load activities');
            console.log('Failed to load activities');
        }
    } catch (err) {
        console.error(`Error loading activities: ${err}`);
    }
}

// Call the function with the extracted studentID
loadActivitiesinDropdown(studentid);
