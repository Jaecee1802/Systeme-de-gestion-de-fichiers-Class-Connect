async function loadFolders(){
    const response = await fetch('/api/folders');
    const folders = await response.json();
    const folderContainer = document.getElementById('folder-container');

    folderContainer.innerHTML = '';

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('subj-folders');
        folderDiv.innerHTML = `<a href="#">
            <div class="myfile-folders is-flex p-4">
                <img src="images/folder.png" alt="Folder" class="image is-32x32">
                <p class="has-text-black mt-2 ml-4">${folder.name}</p> 
            </div>
            <div>
                <button class="button is-danger is-small ml-4 my-2">Delete</button>
                <button class="button is-warning is-small ml-4 my-2">Rename</button>            
            </div>

        </a>`;

        folderContainer.appendChild(folderDiv);
    });
}

document.addEventListener('DOMContentLoaded', loadFolders);