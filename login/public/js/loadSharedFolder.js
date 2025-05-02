async function loadSharedFolders() {
    const response = await fetch('/shared-folders');
    const data = await response.json();

    const container = document.getElementById('shared-folders-container');
    container.innerHTML = '';

    if (!data.success || data.folders.length === 0) {
        container.innerHTML = '<p>No shared folders available.</p>';
        return;
    }

    data.folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('subject-folders');
        folderDiv.innerHTML = `
            <a href="AccessSharedFolder.html?folder=${encodeURIComponent(folder.subjectname)}">
                <img src="images/folder.png" alt="Folder" class="image is-128x128">
                <p class="has-text-black">${folder.subjectname}</p>
            </a>
        `;
        container.appendChild(folderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadSharedFolders);