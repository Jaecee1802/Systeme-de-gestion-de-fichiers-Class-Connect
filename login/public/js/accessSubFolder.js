const urlParams = new URLSearchParams(window.location.search);
const subjectFolderName  = urlParams.get('folder');
document.getElementById('head-folder-name').textContent = subjectFolderName;
document.title = `ClassConnect: ${subjectFolderName}`;

//Accessing the inside of the Subject Folders