const downloadForm = document.getElementById('download-select-folder');

downloadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedFolder = document.querySelector('#download-folder-select').value;

    if (selectedFolder === 'Select Folder') {
        alert('Please select a folder to download.');
        return;
    }

    try {
        const response = await fetch(`/downloadFolder?folderName=${encodeURIComponent(selectedFolder)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to download folder.');
        }

        // Get the zip blob
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link to trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedFolder}.zip`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('An error occurred while downloading the folder.');
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/listFolders');
        const data = await res.json();

        const select = document.getElementById('download-folder-select');
        data.files.forEach(file => {
            const option = document.createElement('option');
            option.value = file.folderName; // make sure this column exists
            option.textContent = file.folderName;
            select.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching folder list:', err);
    }
});