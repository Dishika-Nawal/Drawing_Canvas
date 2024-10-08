window.onload = function() {
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    var mousePressed = false;
    var lastX, lastY;

    document.getElementById('imageLoader').addEventListener('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    });

    canvas.addEventListener('mousedown', function(e) {
        mousePressed = true;
        draw(e.offsetX, e.offsetY, false);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (mousePressed) {
            draw(e.offsetX, e.offsetY, true);
        }
    });

    canvas.addEventListener('mouseup', function() {
        mousePressed = false;
    });

    canvas.addEventListener('mouseleave', function() {
        mousePressed = false;
    });

    document.getElementById('saveBtn').addEventListener('click', function() {
        var dataURL = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = dataURL;
        link.click();
    });

    function draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = 'red'; // Change drawing color here
            ctx.lineWidth = 3; // Change drawing line width here
            ctx.lineJoin = 'round';
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x; lastY = y;
    }
}
