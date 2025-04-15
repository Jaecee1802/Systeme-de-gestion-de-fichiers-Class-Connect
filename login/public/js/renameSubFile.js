const renamefile = document.getElementById("rename-select-subj-file");

renamefile.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedSubFile = document.querySelector("#rename-file-subj-select").value;
    const newSubFileName = document.querySelector("#rename-file-name").value.trim();

    if(selectedSubFile === 'Select File' && !newSubFileName){
        alert('Please select a file to rename it');
        return;
    }

    try{
        const response = await fetch('/api/renamesubjfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedSubFile, newSubFileName })
        });

        const result = await response.json();

        if(result.success){
            alert(result.message);
            renamefile.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(result.message);
        }
    }
    catch(err){
        console.error(`Error renaming file: ${err}`);
    }

})

async function loadSubjFilesDropdown() {
    try{
        const response = await fetch('/api/subjfileslist');
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('rename-file-subj-select');
            select.innerHTML = `<option>Select File</option>`;

            data.files.forEach(file => {
                const option = document.createElement('option');
                option.value = file.custom_name;
                option.textContent = file.custom_name;
                select.appendChild(option);
            })

            console.log(data.files);
        }
        else{
            alert('Failed to load files');
        }
    }
    catch(err){
        console.error(`error loading files: ${err}`);
    }
}



loadSubjFilesDropdown();