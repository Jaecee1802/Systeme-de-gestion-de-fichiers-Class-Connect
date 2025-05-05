const subjectFileDownloadForm = document.getElementById('download-select-file');

subjectFileDownloadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedOption = document.querySelector('#download-file-select').selectedOptions[0];
    const fileName = selectedOption.value;
    const folderName = selectedOption.dataset.folder;

    if (fileName === 'Select File') {
        alert('Please select a file to download.');
        return;
    }

    try {
        const response = await fetch(`/downloadSubFile?fileName=${encodeURIComponent(fileName)}&folderName=${encodeURIComponent(folderName)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to download file.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('An error occurred while downloading the file.');
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/listSubjectFiles');
        const data = await response.json();

        if (data.success) {
            const select = document.getElementById('download-file-select');
            select.innerHTML = `<option>Select File</option>`;

            data.files.forEach(file => {
                const option = document.createElement('option');
                option.value = file.file_name;
                option.textContent = file.custom_name;
                option.dataset.folder = file.folder_name; // store folder in dataset
                select.appendChild(option);
            });
        } else {
            alert('Failed to load subject files.');
        }
    } catch (err) {
        console.error('Error fetching file list:', err);
    }
});