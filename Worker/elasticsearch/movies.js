const client = require("../config/elasticsearch");

// client.indices.create({
//     index: 'moviesharing'
// }, function (err, resp, status) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("create ES index moviesharing", resp);
//     }
// });

let exportedMethods = {
    //this function also allow update when given id already exists
    addMovie(id, movie) {
        client.index({
            index: 'moviesharing',
            type: 'movie',
            id: id,
            body: movie
        }, function (error, response) {
            console.log("add a movie to ES!")
            // console.log(response);
        });
    },

    // search given keyword in all movie
    searchInMovie(keyword) {
        return client.search({
            index: 'moviesharing',
            type: 'movie',
            q: keyword
        }).then((response) => {
            const data = response.hits.hits;
            return data;
        }).catch((error) => {
            console.trace(error.message);
        })

    },

    // search for given category
    searchByCategory(category) {
        return client.search({
            index: 'moviesharing',
            type: 'movie',
            body: {
                query: {
                    match: {
                        category: category
                    }
                }
            }
        }).then((response) => {
            const data = response.hits.hits;
            return data;
        }).catch((error) => {
            console.trace(error.message);
        })
    },

    // search for keyword in given category
    searchInCategory(category, keyword) {
        return client.search({
            index: 'moviesharing',
            type: 'movie',
            body: {
                query: {
                    bool: {
                        must: [{
                            match: {
                                category: category
                            },
                        },
                        {
                            multi_match: {
                                query: keyword,
                                fields: ["name", "year", "directors","stars","writers","description"]
                            }
                        }]
                    }
                }
            },
        }).then((response) => {
            const data = response.hits.hits;
            return data;
        }).catch((error) => {
            console.trace(error.message);
        })
    }


}

module.exports = exportedMethods;