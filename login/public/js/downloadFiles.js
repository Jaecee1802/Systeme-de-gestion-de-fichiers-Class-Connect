const downloadfiles = document.getElementById('download-file-modal');

downloadfiles.addEventListener('submit', async (event) => {
    event.preventDefault();

    const checkBoxes = document.querySelectorAll(`#download-checkboxes input[type="checkbox"]:checked`);
    const selectedFiles = Array.from(checkBoxes).map(checkbox => checkbox.value);

    if(selectedFiles.length === 0){
        alert('Please select at least one file to download');
        return;
    }

    try{
        const response = await fetch('/downloadfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ selectedFiles })
        });

        if(!response.ok){
            throw new Error('Failed to download file(s)');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ClassConnectFiles.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
    catch(error){
        console.error(error);
        alert('Failed to download file(s)');
    }
});
