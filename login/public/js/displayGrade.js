async function displayGrade() {
    try {
        const params = new URLSearchParams(window.location.search);
        const schoolID = params.get("schoolID");

        const response = await fetch(`/displaygrades?schoolID=${schoolID}`);
        const grade = await response.json();
        const gradeContainer = document.getElementById('activity-container');

        gradeContainer.innerHTML = '';

        grade.forEach(grades => {
            const gradeDiv = document.createElement('div');
            gradeDiv.classList.add('activity-item', 'is-flex', 'my-4');
            gradeDiv.id = 'act-box';

            const title = document.createElement('h1');
            title.classList.add('has-text-black-bis');
            title.textContent = grades.activityname;

            const gradesEarned = document.createElement('div');
            gradesEarned.id = 'grades-earned';

            const earned = document.createElement('p');
            earned.classList.add('has-text-black-bis');
            earned.textContent = `Earned Grade: ${grades.grade}`;

            const overall = document.createElement('p');
            overall.classList.add('has-text-black-bis');
            overall.textContent = `Total Grade: ${grades.overallgrade}`;

            gradesEarned.appendChild(earned);
            gradesEarned.appendChild(overall);
            gradeDiv.appendChild(title);
            gradeDiv.appendChild(gradesEarned);

            gradeContainer.appendChild(gradeDiv);
        });
    } catch (error) {
        console.error('Failed to load student grades:', error);
    }
}