const deleteFolderForm = document.querySelector('#delete-folder');

deleteFolderForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const folderName = document.querySelector('#delete-folder-name').value.trim();

    if(folderName){
        const response = await fetch('/api/deletefolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ folderName })
        });

        const result = await response.json();

        if(result.success){
            alert(`Folder ${folderName} deleted successfully`);
            deleteFile.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error deleting folder named ${folderName} cannot be found`);
        }
    }
    else{
        alert('Please enter a folder name that you want to be deleted');
        deleteFile.classList.remove('is-active');
    }
})