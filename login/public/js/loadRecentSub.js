async function loadSubjectFolders() {
    const response = await fetch('/api/recent-subject-folders');
    const folders = await response.json();
    const folderContainer = document.getElementById('subject-container');

    folderContainer.innerHTML = '';

    folders.forEach(subjectfolder => {
        const subfolderDiv = document.createElement('div');
        subfolderDiv.classList.add('subj-folders');
        subfolderDiv.innerHTML = `<a href="AccessFolder.html?folder=${encodeURIComponent(subjectfolder.subjectname)}">
                        <div class="subject-1" id="subject-folder">
                            <img src="images/folder.png" alt="Folder" class="image is-48x48 mx-2">
                            <p class="has-text-black-bis is-size-5 my-2">${subjectfolder.subjectname}</p>
                        </div>
                    </a>`;

        folderContainer.appendChild(subfolderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadSubjectFolders);
