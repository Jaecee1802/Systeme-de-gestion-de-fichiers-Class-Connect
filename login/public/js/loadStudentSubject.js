async function loadSubFolders() {
    const response = await fetch('/api/subjectstudentfolders');
    const subjectfolders = await response.json();
    const subjectfolderContainer = document.getElementById('subject-folders-container');

    subjectfolderContainer.innerHTML = '';

    const currentTime = new Date(); // Current Time

    subjectfolders.forEach(subjectfolder => {
        const { subjectname, deadline } = subjectfolder;

        // If there's a deadline and it is in the past, skip rendering (Student View)
        if (deadline && new Date(deadline) < currentTime) {
            return;
        }

        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-folders');

        
        const formattedDeadline = deadline ? new Date(deadline).toLocaleString() : 'No Deadline Set';

        subjectDiv.innerHTML = `
            <a href="/accessSubjectFolder?folder=${encodeURIComponent(subjectname)}">
                <img src="images/folder.png" alt="Folder" class="image is-128x128">
                <p class="has-text-black">${subjectname}</p>
                <p class="has-text-grey">Deadline: ${formattedDeadline}</p>
            </a>`;

        subjectfolderContainer.appendChild(subjectDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadSubFolders);