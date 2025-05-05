const subjectDownloadForm = document.getElementById('download-select-subject-folder');

subjectDownloadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedFolder = document.querySelector('#download-folder-select').value;

    if (selectedFolder === 'Select Folder') {
        alert('Please select a folder to download.');
        return;
    }

    try {
        const response = await fetch(`/downloadSubjectFolder?folderName=${encodeURIComponent(selectedFolder)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to download subject folder.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedFolder}.zip`;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('An error occurred while downloading the folder.');
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/listSubjectFolders');
        const data = await response.json();

        if (data.success) {
            const select = document.getElementById('download-folder-select');
            select.innerHTML = `<option>Select Folder</option>`;

            const folderSet = new Set();

            data.files.forEach(file => {
                if (!folderSet.has(file. subjectname)) {
                    folderSet.add(file. subjectname);
                    const option = document.createElement('option');
                    option.value = file. subjectname;
                    option.textContent = file. subjectname;
                    select.appendChild(option);
                }
            });
        } else {
            alert('Failed to load subject folders.');
        }
    } catch (err) {
        console.error('Error fetching folder list:', err);
    }
});