const createFolderForm = document.querySelector('#create-folder-form');

createFolderForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const folderName = document.querySelector('#folder-name').value.trim();

    if(folderName){
        const response = await fetch('/api/createfolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ folderName })
        });

        const result = await response.json();

        if(result.success){
            alert('Folder created successfully');
            folderModal.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error ${result.message}`);
        }
    }
    else{
        alert('Please enter a folder name');
        folderModal.classList.remove('is-active');
    }
});