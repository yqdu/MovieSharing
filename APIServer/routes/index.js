const sharemessage = require("./sharemessage");
const comment = require("./comment");

const constructorMethod = (app) => {
    app.use("/sharemessage", sharemessage);
    app.use("/comment", comment);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;