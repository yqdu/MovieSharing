const dbConnection = require("./mongoConnection");

let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

module.exports = {
    users: getCollectionFn("users"),
    movies: getCollectionFn("recipes"),
    comments: getCollectionFn("comments"),
    shareMessages: getCollectionFn("shareMessages")
};

