document.getElementById('search').addEventListener('input', async function() {
    const searchTerm = this.value.trim();
    const folderContainer = document.getElementById('subject-folders-container');
    
    // Clear results immediately when typing
    folderContainer.innerHTML = searchTerm ? '' : '<p>Start typing to search folders.</p>';

    if (!searchTerm) return;

    try {
        const response = await fetch(`/api/search-subj-folders?query=${encodeURIComponent(searchTerm)}`);
        const subjectfolder = await response.json();
        
        folderContainer.innerHTML = subjectfolder.length === 0 
            ? '<p>No folders found.</p>'
            : subjectfolder.map(subjectfolder => `
                <div class="folder">
                    <a href="AccessSubjFolder.html?folder=${encodeURIComponent(subjectfolder.subjectname)}">
                        <div class="is-flex" id="files-info">
                            <div id="folder-info">
                                <img src="images/folder.png" alt="Folder" class="image is-128x128">
                                <p class="has-text-black has-text-centered">${subjectfolder.subjectname}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `).join('');
    } catch (error) {
        console.error('Search failed:', error);
        folderContainer.innerHTML = '<p>Error loading folders.</p>';
    }
});
