const openModal = document.querySelector('#upload-button');
const closeModal = document.querySelector('#close-modal');
const modal = document.querySelector('#upload-modal');

openModal.addEventListener('click', () =>{
    modal.classList.add('is-active');
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('is-active');
})

const openFolderModal = document.querySelector('#folder-button');
const closeFolderModal = document.querySelector('#close-folder-modal');
const folderModal = document.querySelector('#folder-modal');

openFolderModal.addEventListener('click', () => {
    folderModal.classList.add('is-active');
});

closeFolderModal.addEventListener('click', () => {
    folderModal.classList.remove('is-active');
});

document.getElementById("folder-container").innerHTML = "";

//Create Folder

const createFolderForm = document.querySelector('#create-folder-form');

createFolderForm.addEventListener('submit', async(event) => {
    event.preventDefault();

    const folderName = document.querySelector('#folder-name').value;

    if(folderName){
        const response = await fetch('/api/createfolder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ folderName })
        });

        const result = await response.json();

        if(result.success){
            alert('Folder created successfully');
            folderModal.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error ${result.message}`);
        }
    }
    else{
        alert('Please enter a folder name');
    }
});
