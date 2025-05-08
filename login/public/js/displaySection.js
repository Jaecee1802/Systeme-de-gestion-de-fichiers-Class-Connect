async function displaySection() {
    try {
        const response = await fetch('/sections');
        const sections = await response.json();
        const sectionContainer = document.getElementById('section-container');

        sectionContainer.innerHTML = '';

        sections.forEach(section => {
            const sectionBox = document.createElement('div');
            sectionBox.classList.add('box', 'is-flex', 'is-justify-content-space-between', 'is-align-items-center', 'my-4');

            const sectionTitle = document.createElement('h1');
            sectionTitle.classList.add('has-text-white-bis', 'is-size-5');
            sectionTitle.textContent = section.section;

            const viewButton = document.createElement('button');
            viewButton.classList.add('button', 'is-small', 'is-link');
            viewButton.textContent = 'View';

            viewButton.addEventListener('click', () => {
                const sectionName = encodeURIComponent(section.section);
                window.location.href = `/sectionRT?section=${sectionName}`;
            });

            sectionBox.appendChild(sectionTitle);
            sectionBox.appendChild(viewButton);

            sectionContainer.appendChild(sectionBox);
        });
    } catch (error) {
        console.error('Error loading sections:', error);
    }
}

document.addEventListener('DOMContentLoaded', displaySection);