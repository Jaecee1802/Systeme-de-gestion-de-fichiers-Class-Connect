document.getElementById('search').addEventListener('input', async function() {
    const searchTerm = document.getElementById('search').value.trim();

    if (searchTerm === '') {
        return;
    }

    const response = await fetch(`/api/search-folders?query=${encodeURIComponent(searchTerm)}`);
    const folders = await response.json();

    const folderContainer = document.getElementById('folder-container');
    folderContainer.innerHTML = '';

    if (folders.length === 0) {
        folderContainer.innerHTML = '<p>No folders found.</p>';
        return;
    }

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.classList.add('folder');
        folderDiv.innerHTML = `
            <a href="AccessFolder.html?folder=${encodeURIComponent(folder.name)}">
                <div class="is-flex" id="files-info">
                    <div class="" id="folder-info">
                        <img src="images/folder.png" alt="Folder" class="image is-128x128">
                        <p class="has-text-black has-text-centered">${folder.name}</p>
                    </div>
                </div>
            </a>
        `;

        folderContainer.appendChild(folderDiv);
    });
});
