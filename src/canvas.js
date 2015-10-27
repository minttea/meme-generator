(function() {
  var c = document.querySelector('#canvas'),
    ctx = c.getContext('2d'),
    bgImage = new Image(),
    form = document.querySelector('#form'),
    topInput = document.querySelector('#top'),
    bottomInput = document.querySelector('#bottom'),
    fileInput = document.querySelector('#fileInput'),
    defaultImage = 'image.jpg',
    defaultWidth = 500,
    defaultHeight = 500;

  bgImage.src = defaultImage;
    c.width = defaultWidth,
    c.height = defaultHeight;

  function setContextProperties() {
    ctx.font = '36pt Impact';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white'; // for inside letters
    ctx.strokeStyle = 'black'; // for letter outlines
    ctx.lineWidth = 3; // for letter outlines
  }

  function getScaledDim(x, y, xMax, yMax) {
    var xMax = xMax || defaultWidth,
      yMax = yMax || defaultHeight,
      xNew = x,
      yNew = y;

    if(x > xMax || y > yMax) {
      if (x === y) {
        xNew = xMax;
        yNew = yMax;
      } else if(x > y) {
        var scaleFactor = xMax / x;
        xNew = xMax;
        yNew = Math.floor(y * scaleFactor);
      } else {
        var scaleFactor = yMax / y;
        yNew = yMax;
        xNew = Math.floor(x * scaleFactor);
      }
    }

    return {
      'width': Math.round(xNew),
      'height': Math.round(yNew)
    }
  }

  function redrawCanvas(image, topValue, bottomValue) {
    var image = image || bgImage,
      topText = topValue || topInput.value,
      bottomText = bottomValue || bottomInput.value,
      scaledImageDims = getScaledDim(image.width, image.height);

    // update canvas size and properties
    c.width = scaledImageDims.width;
    c.height = scaledImageDims.height;
    setContextProperties();

    // redraw scaled image on scaled canvas
    ctx.drawImage(image, 0, 0, c.width, c.height);

    ctx.textBaseline = 'top'; // for drawing the top text
    ctx.fillText(topText, c.width / 2, 0);
    ctx.strokeText (topText, c.width / 2, 0);

    ctx.textBaseline = 'bottom'; // for drawing the bottom text
    ctx.fillText(bottomText, c.width / 2, c.height);
    ctx.strokeText (bottomText, c.width / 2, c.height);
  }

  function updateImage() {
    var file = fileInput.files[0];

    var reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = function() {
      bgImage.src = reader.result; // this reloads the image
    }
  };

  bgImage.addEventListener('load', function() {
    redrawCanvas(bgImage)
  });

  bgImage.onerror = function() {
    bgImage.src = defaultImage;
  };

  form.addEventListener('input', function (e) {
    redrawCanvas(bgImage);
  }, false);

  fileInput.addEventListener('change', function() {
    updateImage();
  }, false);
}());
