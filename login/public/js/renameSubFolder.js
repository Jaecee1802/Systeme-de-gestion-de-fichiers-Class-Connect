const renameSubject = document.getElementById('rename-subject-folder');

renameSubject.addEventListener('submit', async(event) => {
    event.preventDefault();

    const selectedSubject = document.querySelector('#rename-subject-folder-select').value;
    const newSubjectName = document.querySelector('#rename-subject-folder-name').value.trim();

    if(selectedSubject === 'Select Subject Folder' && !newSubjectName){
        alert('Please select a subject folder to rename a folder.');
        return;
    }

    try{
        const response = await fetch('/api/renamesubjectfolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedSubject, newSubjectName})
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

async function loadSubjectsinDropdown() {
    try{
        const response = await fetch('/api/subjectslist');
        const data = await response.json();

        if(data.success){
            const selectSubject = document.getElementById('rename-subject-folder-select');
            selectSubject.innerHTML = `<option>Select Subject Folder</option>`;

            data.folders.forEach(subjectfolder => {
                const option = document.createElement('option');
                option.value = subjectfolder.subjectname; 
                option.textContent = subjectfolder.subjectname;
                selectSubject.appendChild(option);
            })
        }
    }
    catch(err){
        console.error(`error loading folders: ${err}`);
    }
}

loadSubjectsinDropdown();