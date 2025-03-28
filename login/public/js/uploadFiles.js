const uploadBtn = document.getElementById("upload-file-button");

uploadBtn.addEventListener('click', async() => {
    const folderName = new URLSearchParams(window.location.search).get('folder');
    const fileInput = document.querySelector('input[type="file"]');
    const customName = document.getElementById('file-name').value;

    if(!fileInput.files.length){
        alert('Please attach a file');
        return;
    }

    if (!folderName) {
        alert("Invalid file name. Please try again.");
        return;
    }

    if(!customName){
        alert('Please enter a custom name for the file');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('customName', customName);

    try{
        const response = await fetch(`/upload?folder=${encodeURIComponent(folderName)}`, {
                method: 'POST',
                body: formData
        });
        if(response.ok){
            alert('File upload successful');
            location.reload();
        }
        else{
            alert('File upload failed');
        }
    }
    catch(err){
        console.error(err);
        alert('An error occurred while uploading the file.');
    }
})