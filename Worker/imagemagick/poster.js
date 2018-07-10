// this module process the poster picture user uploaded to a standard foramt 
// take the url of original picture as input and return the fixed picture's url so the data.movies can call it easily
const im = require('imagemagick');
const uuid = require('node-uuid');

let exportedMethods = {
    processPoster(url, id) {
        // console.log(url)
        const desPath = "../FrontEnd/public/processedposters/";
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
            if (err) console.log(err);
        });
        console.log("Stored a movie poster!")
        return id + ".png";
    },

    precessScreen(url) {
        // console.log(url)
        const desPath = "../FrontEnd/public/processedscreens/";
        const id = uuid.v4();
        var optionsObj = {
            srcPath: url,
            dstPath: desPath + id + ".png",
            quality: 1.0,
            height: "450",
            format: 'png'
        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) throw "convert screen failed";
        });
        console.log("Stored a movie screenshot!")
        return id + ".png";
    },

    processProfile(url, username){
        const desPath = "../FrontEnd/public/profilepictures/";
        var optionsObj = {
            srcPath: url,
            dstPath: desPath + username + ".png",
            quality: 1.0,
            width: "250",
            height: "250",
            format: 'png',
            customArgs: [
                '-gravity', 'center',
                "-bordercolor", "black",
                "-border", "5x5",
            ]
        };
        im.resize(optionsObj, function (err, stdout) {
            if (err) console.log(err);
        });
        console.log("Stored a user profile picture!")
        return username + ".png";
    }
}

module.exports = exportedMethods;
