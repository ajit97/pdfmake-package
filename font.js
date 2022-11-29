var path = require('path');

var fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname,"./",'Roboto/Roboto-Regular.ttf'),
        bold: path.join(__dirname, './', 'Roboto/Roboto-Medium.ttf'),
        italics: path.join(__dirname, './', 'Roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, './', 'Roboto/Roboto-MediumItalic.ttf')
    }
};

module.exports = fontDescriptors;