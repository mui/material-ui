// @flow weak
const pngCrop = require('png-crop');

module.exports = function screenshotElement(client, screenshotPath, windowSize, done) {
  client.element('css selector', '[data-reactroot] > *:first-child', (element) => {
    client.elementIdLocationInView(element.value.ELEMENT, (location) => {
      client.elementIdSize(element.value.ELEMENT, (size) => {
        client.saveScreenshot(screenshotPath, () => {
          const cropWidth = size.value.width < windowSize.width - 30;
          const cropHeight = size.value.height < windowSize.height - 30;

          if (cropWidth || cropHeight) {
            const config = {
              width: cropWidth ? size.value.width + 30 : windowSize.width,
              height: cropHeight ? size.value.height + 30 : windowSize.height,
              top: cropHeight && location.value.y >= 15 ? location.value.y - 15 : location.value.y,
              left: cropWidth && location.value.x >= 15 ? location.value.x - 15 : location.value.x,
            };
            pngCrop.crop(screenshotPath, screenshotPath, config, (err) => {
              if (err) throw err;
              done();
            });
          } else {
            done();
          }
        });
      });
    });
  });
};
