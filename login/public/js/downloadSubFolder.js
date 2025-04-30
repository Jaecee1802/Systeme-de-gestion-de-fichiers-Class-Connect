const downloadForm = document.getElementById('download-select-folder');

downloadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedFolder = document.querySelector('#download-folder-select').value;

    if (selectedFolder === 'Select Folder') {
        alert('Please select a folder to download.');
        return;
    }

    try {
        const response = await fetch(`/downloadSubFolder?folderName=${encodeURIComponent(selectedFolder)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to download folder.');
        }


        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

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
        const response = await fetch('/listFolders');
        const data = await response.json();

        if (data.success) {
            const select = document.getElementById('download-folder-select');
            select.innerHTML = `<option>Select Folder</option>`;

            const folderSet = new Set();

            data.files.forEach(file => {
                if (!folderSet.has(file.folder_name)) {
                    folderSet.add(file.folder_name);
                    const option = document.createElement('option');
                    option.value = file.folder_name;
                    option.textContent = file.folder_name;
                    select.appendChild(option);
                }
            });
        } else {
            alert('Failed to load folders');
            console.log('Failed to load folders');
        }
    } catch (err) {
        console.error('Error fetching folder list:', err);
    }
});