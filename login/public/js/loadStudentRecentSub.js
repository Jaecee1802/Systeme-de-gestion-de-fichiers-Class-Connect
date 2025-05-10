async function loadSubjectFolders() {
    const response = await fetch('/api/recent-subject-student-folders');
    const folders = await response.json();
    const folderContainer = document.getElementById('subject-container');

    folderContainer.innerHTML = '';

    const currentTime = new Date(); // Current Time

    folders.forEach(subjectfolder => {
        const { subjectname, deadline } = subjectfolder;

        // If there's a deadline and it is in the past, skip rendering
        if (deadline && new Date(deadline) < currentTime) {
            return;
        }

        const subfolderDiv = document.createElement('div');
        subfolderDiv.classList.add('subj-folders');
        subfolderDiv.innerHTML = `<a href="AccessSubjFolder.html?folder=${encodeURIComponent(subjectfolder.subjectname)}">
                        <div class="subject-1" id="subject-folder">
                            <img src="images/folder.png" alt="Folder" class="image is-48x48 mx-2">
                            <p class="has-text-black-bis is-size-5 my-2">${subjectfolder.subjectname}</p>
                        </div>
                    </a>`;

        folderContainer.appendChild(subfolderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadSubjectFolders);