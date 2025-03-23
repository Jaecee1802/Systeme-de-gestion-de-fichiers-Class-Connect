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
                <div class="is-flex" id="folder-info">
                    <img src="images/folder.png" alt="Folder" class="image is-64x64">
                    <p class="has-text-black px-4 py-2" id="folder-name">${folder.name}</p>
                </div>

                <div class="buttons">
                    <button class="button is-danger delete-folder-button data-id = ${folder.id}">Delete</button>
                    <button class="button is-warning">Rename</button>
                </div>
            </div>
        </a>`;

        folderContainer.appendChild(folderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadFolders);
