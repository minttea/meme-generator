(function() {
  var c = document.querySelector('#canvas'),
    ctx = c.getContext('2d'),
    bgImage = new Image(),
    form = document.querySelector('#form'),
    topInput = document.querySelector('#top'),
    bottomInput = document.querySelector('#bottom');

  bgImage.src = 'image.jpg';

  bgImage.addEventListener('load', function() {
    ctx.drawImage(bgImage, 0, 0, c.width, c.height);
  })

  ctx.font = '36pt Impact';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white'; // for inside letters
  ctx.strokeStyle = 'black'; // for letter outlines
  ctx.lineWidth = 3; // for letter outlines

  form.addEventListener('input', function (e) {
    var topValue = topInput.value,
      bottomValue = bottomInput.value;
    redrawText(topValue, bottomValue);
  }, false);

  function redrawText(topText, bottomText) {
    ctx.drawImage(bgImage, 0, 0, c.width, c.height); //redraw image

    ctx.textBaseline = 'top'; // for drawing the top text
    ctx.fillText(topText, c.width / 2, 0);
    ctx.strokeText (topText, c.width / 2, 0);

    ctx.textBaseline = 'bottom'; // for drawing the bottom text
    ctx.fillText(bottomText, c.width / 2, c.height);
    ctx.strokeText (bottomText, c.width / 2, c.height);
  }
}());
