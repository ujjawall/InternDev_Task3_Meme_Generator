document.getElementById('generate-meme').addEventListener('click', function() {
    const topText = document.getElementById('top-text').value;
    const bottomText = document.getElementById('bottom-text').value;
    const imageInput = document.getElementById('image-input').files[0];
    const selectedFont = document.getElementById('font-select').value;
    const selectedColor = document.getElementById('color-picker').value;

    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                const canvas = document.getElementById('meme-canvas');
                const ctx = canvas.getContext('2d');
                
                // Set canvas dimensions to match the image
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image
                ctx.drawImage(img, 0, 0);

                // Set text properties
                ctx.font = `30px ${selectedFont}`;
                ctx.fillStyle = selectedColor;
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.textAlign = 'center';

                // Add top text
                ctx.fillText(topText, canvas.width / 2, 40);
                ctx.strokeText(topText, canvas.width / 2, 40);

                // Add bottom text
                ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
                ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
            }
        }
        reader.readAsDataURL(imageInput);
    } else {
        alert('Please select an image!');
    }
});

document.getElementById('download-meme').addEventListener('click', function() {
    const canvas = document.getElementById('meme-canvas');
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
