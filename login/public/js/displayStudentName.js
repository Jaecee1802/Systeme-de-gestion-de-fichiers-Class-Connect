async function displayName() {
    try {
        const params = new URLSearchParams(window.location.search);
        const section = params.get("section");

        const response = await fetch(`/displaystudentname?section=${encodeURIComponent(section)}`);
        const students = await response.json();
        const studentContainer = document.getElementById('student-container');

        studentContainer.innerHTML = '';

        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student-one', 'is-flex', 'my-4');
            studentDiv.id = 'student-box';

            const studentName = student.studentName;

            studentDiv.innerHTML = `
                <h1 class="has-text-black-bis">${studentName}</h1>
                <button class="button is-small view-button">View</button>
            `;

            const viewButton = studentDiv.querySelector('.view-button');
            viewButton.addEventListener('click', () => {
                window.location.href = `StudentGrades.html?section=${encodeURIComponent(section)}&student=${encodeURIComponent(studentName)}`;
            });

            studentContainer.appendChild(studentDiv);
        });
    } catch (error) {
        console.error('Error loading student names:', error);
    }
}

document.addEventListener('DOMContentLoaded', displayName);