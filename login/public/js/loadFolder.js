async function loadFolders(){
    const response = await fetch('/api/folders');
    const folders = await response.json();
    const folderContainer = document.getElementById('folder-container');

    folderContainer.innerHTML = '';

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('subj-folders');
        folderDiv.innerHTML = "";

        folderContainer.appendChild(folderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadFolders);