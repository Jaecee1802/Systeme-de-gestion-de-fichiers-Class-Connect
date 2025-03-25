const renameFolderForm = document.getElementById('rename-folder');

renameFolderForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const folderName = document.getElementById('rename-folder-name').value.trim();

    if(folderName){
        const response = await fetch('/api/renamefolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ oldName: foldertoRename, newName: folderName })
        });

        const result = await response.json();

        if(result.success){
            alert('Folder renamed successfully');
            renameModal.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error renaming folder ${folderName} either cannot be renamed or does not exist`);
        }
    }
    else{
        alert('Please enter the name so it can be renamed!');
    }
})