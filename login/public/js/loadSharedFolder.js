async function loadSharedFolders() {
    try {
        const sectionRes = await fetch('/student-info');
        const sectionData = await sectionRes.json();

        if (!sectionData.success) {
            document.getElementById('shared-folders-container').innerHTML = '<p>Unable to load section info.</p>';
            return;
        }

        const userSection = sectionData.section;

        const response = await fetch(`/shared-folders?section=${encodeURIComponent(userSection)}`);
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
                <a href="AccessSubjFolder.html?folder=${encodeURIComponent(folder.subjectname)}">
                    <img src="images/folder.png" alt="Folder" class="image is-128x128">
                    <p class="has-text-black">${folder.subjectname}</p>
                </a>
            `;
            container.appendChild(folderDiv);
        });
    } catch (err) {
        console.error("Error loading shared folders:", err);
    }
}

document.addEventListener('DOMContentLoaded', loadSharedFolders);