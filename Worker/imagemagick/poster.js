// this module process the poster picture user uploaded to a standard foramt 
// take the url of original picture as input and return the fixed picture's url so the data.movies can call it easily
const im = require('imagemagick');

let exportedMethods = {
    processPoster(url, id){
        const desPath = "../../FrontEnd/public/processedposters/";
        var optionsObj = {
            srcPath: url,
            dstPath: desPath + id + ".png",
            quality: 1.0,
            width: "350",
            height: "450",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]

        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) throw "convert poster failed";
        });
        return optionsObj.dstPath;
    }
}

module.exports = exportedMethods;
