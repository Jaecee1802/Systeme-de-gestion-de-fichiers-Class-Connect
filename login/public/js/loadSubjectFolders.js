async function loadSubFolders(){
    const response = await fetch('/api/subjectfolders');
    const subjectfolder = await response.json();
    const subjectfolderContainer = document.getElementById('subject-folders-container');

    subjectfolderContainer.innerHTML = '';

    subjectfolder.forEach(subjectfolder => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject-folders');
        subjectDiv.innerHTML = `<a href="#">
                <img src="images/folder.png" alt="Folder" class="image is-128x128">
                <p class="has-text-black">${subjectfolder.subjectname}</p>
            </a>`;

        subjectfolderContainer.appendChild(subjectDiv);
    })
}

document.addEventListener('DOMContentLoaded', loadSubFolders);