const SubjectFileUpload = document.getElementById('subject-file-button');

SubjectFileUpload.addEventListener('click', async () => {
    const subjectFolderName = new URLSearchParams(window.location.search).get('folder');
    const fileInput = document.querySelector('input[type="file"]');
    const customName = document.getElementById('subject-file-name').value;

    if(!fileInput.files.length){
        alert('Please attach a file');
        return;
    }

    if (!subjectFolderName) {
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
        const response = await fetch(`/subjupload?folder=${encodeURIComponent(subjectFolderName)}`, {
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