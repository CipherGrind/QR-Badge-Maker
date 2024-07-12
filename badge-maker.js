document.getElementById('username').addEventListener('input', function() {
    validateInput(this);
});

document.getElementById('password').addEventListener('input', function() {
    validateInput(this);
});

function validateInput(input) {
    if (input.value.length > 100) {
        input.value = input.value.slice(0, 100);
    }
}

function generateBadge() {
    var username = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    generateQRCode('usernameQRCode', username);
    generateQRCode('passwordQRCode', password);
}

function generateQRCode(canvasId, text) {
    var canvas = document.getElementById(canvasId);
    canvas.innerHTML = ''; 

    var qr = new QRious({
        element: canvas,
        value: text,
        size: 100
    });
}

function clearBadge() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    clearCanvas('usernameQRCode');
    clearCanvas('passwordQRCode');
}

function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadBadge() {
    const badge = document.getElementById('badge');
    const dpi = 300; 
    const widthInInches = 3.375;
    const heightInInches = 2.125;
    const widthInPixels = widthInInches * dpi;
    const heightInPixels = heightInInches * dpi;

    html2canvas(badge, {
        width: widthInPixels,
        height: heightInPixels,
        scale: dpi / 300, 
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'badge.png';
        link.click();
    }).catch(err => {
        console.error('Error generating image:', err);
        alert('An error occurred while generating the badge image.');
    });
}
