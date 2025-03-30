const renamefile = document.getElementById("rename-select-file");

renamefile.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedFile = document.querySelector("#rename-file-select").value;
    const newFileName = document.querySelector("#rename-file-name").value.trim();

    if(selectedFile === 'Select File' && !newFileName){
        alert('Please select a file to rename it');
        return;
    }

    try{
        const response = await fetch('/api/renamefile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedFile, newFileName })
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

async function loadFilesDropdown() {
    try{
        const response = await fetch('/api/fileslist');
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('rename-file-select');
            select.innerHTML = `<option>Select File</option>`;

            data.files.forEach(file => {
                const option = document.createElement('option');
                option.value = file.custom_name;
                option.textContent = file.custom_name;
                select.appendChild(option);
            })
        }
        else{
            alert('Failed to load files');
        }
    }
    catch(err){
        console.error(`error loading files: ${err}`);
    }
}

loadFilesDropdown();