async function loadSubFolders() {
    const subjectfolderContainer = document.getElementById('subject-folders-container');
    subjectfolderContainer.innerHTML = '';

    // Load personal subject folders
    try {
        const response = await fetch('/api/subjectfolders');
        const subjectFolders = await response.json();

        subjectFolders.forEach(folder => {
            const subjectDiv = document.createElement('div');
            subjectDiv.classList.add('subject-folders');
            subjectDiv.innerHTML = `<a href="AccessSubjFolder.html?folder=${encodeURIComponent(folder.subjectname)}">
                    <img src="images/folder.png" alt="Folder" class="image is-128x128">
                    <p class="has-text-black">${folder.subjectname}</p>
                </a>`;
            subjectfolderContainer.appendChild(subjectDiv);
        });
    } catch (err) {
        console.error("Error loading personal folders:", err);
    }

    // Load shared folders
    try {
        const sectionRes = await fetch('/student-info');
        const sectionData = await sectionRes.json();

        if (!sectionData.success) {
            console.error("Unable to retrieve student section.");
            return;
        }

        const section = sectionData.section;
        const sharedRes = await fetch(`/shared-folders?section=${encodeURIComponent(section)}`);
        const sharedData = await sharedRes.json();

        if (!sharedData.success) {
            console.error("Unable to retrieve shared folders.");
            return;
        }

        sharedData.folders.forEach(folder => {
            const folderDiv = document.createElement('div');
            folderDiv.classList.add('subject-folders');
            folderDiv.innerHTML = `<a href="AccessSubjFolder.html?folder=${encodeURIComponent(folder.subjectname)}">
                    <img src="images/folder.png" alt="Shared Folder" class="image is-128x128">
                    <p class="has-text-black">${folder.subjectname} <span style="color: #3273dc;">(Shared)</span></p>
                </a>`;
            subjectfolderContainer.appendChild(folderDiv);
        });
    } catch (error) {
        console.error("Error loading shared folders:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadSubFolders);