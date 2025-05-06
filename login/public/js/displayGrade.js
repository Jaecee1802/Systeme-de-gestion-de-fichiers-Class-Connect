async function displayGrade() {
    try {
        const response = await fetch(`/displaygrades`);
        const grades = await response.json();

        const activityBoxes = document.querySelectorAll('#act-box');

        grades.forEach((gradeData, index) => {
            if (index < activityBoxes.length) {
                const box = activityBoxes[index];
                box.querySelector('#activity-name').textContent = gradeData.activityname;
                box.querySelector('#students-grade').textContent = `Earned Grade: ${gradeData.grade}`;
                box.querySelector('#overall-grade').textContent = `Total Grade: ${gradeData.overallgrade}`;
            }
        });
    } catch (error) {
        console.error('Failed to load student grades:', error);
    }
}