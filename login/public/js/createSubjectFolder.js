const createSubjectFolder = document.querySelector('#create-subject-folder-form');

createSubjectFolder.addEventListener('submit', async(event) => {
    event.preventDefault();

    const subjectFolderName = document.querySelector('#subject-folder-name').value.trim();

    if(subjectFolderName){
        const response = await fetch('/api/createsubjectfolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subjectFolderName })
        });

        const result = await response.json();

        if(result.success){
            alert('Subject folder created successfully');
            createSubjectFolder.classList.remove('is-active');
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
})