document.getElementById("share-subject-folder").addEventListener("submit", async function(e){
    e.preventDefault();

    const folderId = document.getElementById("share-sub-list").value;
    const section = document.getElementById("section-select").value;

    const response = await fetch("/sharefolder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectFoldID: folderId, section })
    });

    const data = await response.json();
    if(data.success){
        alert("Folder shared successfully!");
    } else {
        alert("Failed to share folder.");
    }
});

async function loadFolderstoShare(){
    try{
        const response = await fetch("/sharefolderlist");
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('share-sub-list');
            select.innerHTML = `<option>Select Subject Folder</option>`;

            data.folders.forEach(subjectfolder => {
                const option = document.createElement('option');
                option.value = subjectfolder.subjectname; 
                option.textContent = subjectfolder.subjectname;
                selectSubject.appendChild(option);
            })
        }
        else{
            alert('Failed to load folders');
            console.log('Failed to load folders');
        }
    }
    catch(err){
        console.error(`error loading folders: ${err}`);
    }
}
loadFolderstoShare()

async function loadSections(){
    try{
        const response = await fetch("/sectionslist");
        const data = await response.json();

        if(data.success){
            const select = document.getElementById('section-select');
            select.innerHTML = `<option>Select Section</option>`;

            data.sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.name; 
                option.textContent = section.name;
                select.appendChild(option);
            })
        }
        else{
            alert('Failed to load sections');
            console.log('Failed to load sections');
        }
    }
    catch(err){
        console.error(`error loading sections: ${err}`);
    }
}

loadSections()