const deleteSubject = document.querySelector('#delete-subject-folder');

deleteSubject.addEventListener('submit', async(event) => {
    event.preventDefault();

    const subjectFolderName = document.querySelector('#delete-subject-folder-name').value.trim();

    if(subjectFolderName){
        const response = await fetch('/api/deletesubjectfolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subjectFolderName })
        });

        const result = await response.json();

        if(result.success){
            alert(`Folder ${subjectFolderName} deleted successfully`);
            deleteModal.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error deleting folder named ${subjectFolderName} cannot be found`);
        }
    }
    else{
        alert('Please enter a folder name that you want to be deleted');
        deleteFile.classList.remove('is-active');
    }
})