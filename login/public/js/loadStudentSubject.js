async function loadSubFolders() {
    const response = await fetch('/api/subjectstudentfolders');
    const subjectfolders = await response.json();
    const subjectfolderContainer = document.getElementById('subject-folders-container');

    subjectfolderContainer.innerHTML = '';

    const currentTime = new Date();

    subjectfolders.forEach(subjectfolder => {
        const { subjectname, deadline } = subjectfolder;

        if (deadline && new Date(deadline) < currentTime) {
            return;
        }

        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-folders');
        subjectDiv.id = `folder-${subjectname.replace(/\s+/g, '-')}`; // Unique ID for easier removal

        const formattedDeadline = deadline ? new Date(deadline).toLocaleString() : 'No Deadline Set';

        subjectDiv.innerHTML = `
            <a href="/accessSubjectFolder?folder=${encodeURIComponent(subjectname)}">
                <img src="images/folder.png" alt="Folder" class="image is-128x128">
                <p class="has-text-black">${subjectname}</p>
                <p class="has-text-grey">Deadline: ${formattedDeadline}</p>
            </a>`;

        subjectfolderContainer.appendChild(subjectDiv);

        // Check the deadline every second
        if (deadline) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                if (new Date(deadline) < currentTime) {
                    const element = document.getElementById(`folder-${subjectname.replace(/\s+/g, '-')}`);
                    if (element) {
                        element.remove();
                    }
                    clearInterval(interval); // Stop checking after removal
                }
            }, 1000); // 1 second interval
        }
    });
}
