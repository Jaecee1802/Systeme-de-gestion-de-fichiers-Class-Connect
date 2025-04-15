//Displaying the files INSIDE the folder

document.addEventListener("DOMContentLoaded", async () => {
    const subjectFolderName = new URLSearchParams(window.location.search).get('folder');
    const fileContainer = document.getElementById('file-container');

    if (!subjectFolderName) {
        console.error("Folder name not found");
        return;
    }

    try {
        const response = await fetch(`/subjfiles?folder=${encodeURIComponent(subjectFolderName)}`);
        const files = await response.json();

        fileContainer.innerHTML = "";

        if (files.length === 0) {
            fileContainer.innerHTML = "<p class='has-text-black'>No files found.</p>";
            return;
        }

        files.forEach((file) => {
            const fileType = file.original_name.split(".").pop().toLowerCase();
            const filePath = `/uploads/${file.folder_name}/${file.file_path}`;

            const fileIcons = {
                "pdf": "images/PDF file.png",
                "docx": "images/DOCX file.png",
                "pptx": "images/PPTX file.png",
                "xlsx": "images/EXCEL file.png",
                "mp3": "images/Audio File.png",
                "wav": "images/Audio File.png",
                "rar": "images/RAR file.png",
                "zip": "images/ZIP file.png",
                "mp4": "images/Video file.png",
                "mov": "images/Video file.png",
                "avi": "images/Video file.png",
                "jpg": "images/Image.png",
                "jpeg": "images/Image.png",
                "png": "images/Image.png",
                "gif": "images/Image.png",
            };

            const fileIcon = fileIcons[fileType] || "images/Unknown file.png";

            // Display filename with extension
            const fileNameWithExtension = `${file.custom_name}.${fileType}`;

            const fileElement = document.createElement("a");
            fileElement.href = "#";
            fileElement.innerHTML = `
                <div class="is-flex" id="files-info">
                    <div id="file-info">
                        <img src="${fileIcon}" alt="${fileType} file" class="image is-128x128">
                        <p class="has-text-black has-text-centered mt-2">${fileNameWithExtension}</p>
                    </div>
                </div>`;

            fileContainer.appendChild(fileElement);
        });
    } catch (err) {
        console.error(`Error fetching files: ${err}`);
        fileContainer.innerHTML = "<p class='has-text-black'>Error loading files.</p>";
    }
});
