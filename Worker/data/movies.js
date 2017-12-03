const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
//keep consistent in ES
//advanced searching using ../elasticsearch
const es = require("../elasticsearch");
const uuid = require('node-uuid');

let exportedMethods = {

}

module.exports = exportedMethods;