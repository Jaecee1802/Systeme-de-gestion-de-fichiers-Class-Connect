const deleteFile = document.getElementById('delete-file-form');

deleteFile.addEventListener('submit', async(event) => {
    event.preventDefault();

    const fileName = document.querySelector('#delete-file-name').value.trim();

    if(fileName){
        const response = await fetch('/api/deletefile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fileName })
        });

        const result = await response.json();

        if(result.success){
            alert(`File ${fileName} deleted successfully`);
            deleteFile.classList.remove('is-active');
            window.location.reload();
        }
        else{
            alert(`Error deleting file named ${fileName} cannot be found`);
        }
    }
    else{
        alert('Please enter a file name that you want to be deleted');  
        deleteFile.classList.remove('is-active');
    }
})