document.addEventListener('click', async(event) => {
    if(event.target.classList.contains('delete-folder-button')) {
        const folderId = event.target.getAttribute('data-id');

        if(confirm('Are you sure you want to delete this folder?')) {

            try{
                const response = await fetch(`/api/deletefolder`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ folderId })
                });
    
                const result = await response.json();
    
                if(result.success){
                    alert('Folder deleted successfully');
                    window.location.reload();
                }else{
                    alert(`Error ${result.message}`);
                }
            }

            catch(error){
                console.log(error);
            }
        }
    }
})