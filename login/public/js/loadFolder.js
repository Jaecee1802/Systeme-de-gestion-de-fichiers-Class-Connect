async function loadFolders(){
    const response = await fetch('/api/folders');
    const folders = await response.json();
    const folderContainer = document.getElementById('folder-container');

    folderContainer.innerHTML = '';

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('subj-folders');
        folderDiv.innerHTML = `<a href="#">
            <div class="is-flex" id="files-info">
                <div class="" id="folder-info">
                    <img src="images/folder.png" alt="Folder" class="image is-128x128">
                    <p class="has-text-black has-text-centered">${folder.name}</p>
                </div>
            </div>
        </a>`;

        folderContainer.appendChild(folderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadFolders);
