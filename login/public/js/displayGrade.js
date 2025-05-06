async function displayGrade() {
    const params = new URLSearchParams(window.location.search);
    const studentID = params.get("studentID");

    if (!studentID) {
        console.error("Missing studentID in URL");
        return;
    }

    const response = await fetch(`/displaygrades?studentID=${studentID}`);
    const activity = await response.json();

    const activityContainer = document.getElementById('activity-container');
    activityContainer.innerHTML = '';

    activity.forEach(grade => {
        const activityDiv = document.createElement('div');
        activityDiv.classList.add('activity-one', 'is-flex', 'my-4');
        activityDiv.innerHTML = `
            <h1 class="activity-name has-text-black-bis">${grade.activityname}</h1>
            <div id="grades-earned">
                <p class="students-grade has-text-black-bis">Earned Grade: ${grade.grade}</p>
                <p class="overall-grade has-text-black-bis">Total Grade: ${grade.overallgrade}</p>
            </div>
        `;
        activityContainer.appendChild(activityDiv);
    });
}

document.addEventListener('DOMContentLoaded', displayGrade);