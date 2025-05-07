const setDeadlineForm = document.getElementById('setdeadline-subject-folder-form');

setDeadlineForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const selectedFolderID = document.querySelector('#deadline-subject-folder-select').value;
    const deadlineDate = document.querySelector('#deadlinedate-input').value;

    if (!selectedFolderID || selectedFolderID === '' || !deadlineDate) {
        alert('Please select a valid subject folder and set a deadline.');
        return;
    }

    try{
        const response =  await fetch('/setDeadline', {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({selectedFolderID, deadlineDate})
        });

        const result = await response.json();

        if(result.success){
            alert(result.message);
            setDeadlineForm.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error ${result.message}`);
        }
    }
    catch(err){
        console.log(err);
        alert("Something went wrong.");
    }
})

async function loadSubjectDeadline() {
    try {
        const response = await fetch('/getsubDeadline');
        const result = await response.json();

        if(result.success){
            const selectDeadlineSub = document.getElementById('deadline-subject-folder-select');
            selectDeadlineSub.innerHTML = '<option>Select Folder</option>';

            result.deadlines.forEach(subjectfolder => {
                const option = document.createElement('option');
                option.value = subjectfolder.subjectFoldID; 
                option.textContent = subjectfolder.subjectname;
                selectDeadlineSub.appendChild(option);
            });
        }
    }
    catch(err){
        console.log(err);
        alert("Something went wrong.");
    }
}

loadSubjectDeadline()