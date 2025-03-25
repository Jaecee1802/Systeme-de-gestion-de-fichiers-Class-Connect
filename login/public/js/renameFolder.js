const renameForm = document.getElementById('rename-folder');

renameForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const selectedFolder = document.querySelector('#rename-folder-select').value; //I declared it correctly
    const newFolderName = document.querySelector('#rename-folder-name').value.trim();

    if(selectedFolder === 'Select Folder' && !newFolderName){
        alert('Please select a folder to rename a folder.');
        return;
    }

    try{
        const response = await fetch('/api/renamefolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedFolder, newFolderName })
        });

        const result = await response.json();

        if(result.success){
            alert(result.message);
            renameModal.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(result.message);
        }
    }
    catch(error){
        console.error(error);
        alert('An error occurred while renaming the folder.');
    }
})

async function loadFoldersInDropdown() {
    try {
        const response = await fetch('/api/folderslist');
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('rename-folder-select');
            select.innerHTML = `<option>Select Folder</option>`;

            data.folders.forEach(folder => {
                const option = document.createElement('option');
                option.value = folder.name;
                option.textContent = folder.name;
                select.appendChild(option);
            })
        }
        else{
            alert('Failed to load folders');
            console.log('Failed to load folders');
        }
    }
    catch(err){
        console.error(`error laoding folders: ${err}`);
    }
}