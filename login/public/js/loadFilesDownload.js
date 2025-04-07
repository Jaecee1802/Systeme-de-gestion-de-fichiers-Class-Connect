document.addEventListener('DOMContentLoaded', () => {
    fetch('/getfiles')
        .then(res => res.json())
        .then(files => {
            const container = document.getElementById('download-checkboxes');
            container.innerHTML = ''; // Clear existing

            files.forEach(file => {
                const label = document.createElement('label');
                label.className = 'checkbox has-text-black';
                label.innerHTML = `
                    <input type="checkbox" value="${file}">
                    ${file}
                `;
                container.appendChild(label);
                container.appendChild(document.createElement('br'));
            });
        })
        .catch(err => {
            console.error('Error fetching files:', err);
        });
});
