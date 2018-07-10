const bcrypt = require("bcrypt-nodejs");
const data = require("./data");
const dbConnection = require("./config/mongoConnection");
const movies = data.movies;
const users = data.users;
const comments = data.comments;
const sharemessages = data.sharemessages;

const uuid = require('node-uuid');
const client = require("./config/elasticsearch");
//const moment = require("moment");

client.deleteByQuery({
    index: 'moviesharing',
    type: 'movie',
    body: {
        query: {
            match_all: {}
        }
    }
}, function (error, response) {
    console.log("ES deleted!")
});
let u1, u2, u3, u4;
let m1;
let m2;
let m3;
let m4;//action
let m5, m6, m7, m8;//fiction
let m9, m10, m11, m12;//horror
let m13, m14, m15, m16;//animation
let m17, m18, m19, m20;//comedy
let m21, m22, m23, m24;//drama
let m25, m26, m27, m28;//romantic
dbConnection().then((db) => {
    return db.dropDatabase().then(() => {
        console.log("MongoDB Droped!")
        return dbConnection;
    }).then((db) => {
        requestBody = {
            username: "john",
            email: "john@email.com", //decodeURIComponent?
            profile: "../APIServer/uploads/user1.jpg",
            password: "1234"
        }
        return users.addUser(requestBody).then((user) => {
            u1 = user;
        });
    })
        .then((jhon) => {
            requestBody = {
                username: "Amy",
                email: "amy@email.com", //decodeURIComponent?
                profile: "../APIServer/uploads/user2.jpg",
                password: "1234"
            }
            return users.addUser(requestBody).then((user) => {
                u2 = user;
            });
        })
        .then((Amy) => {
            requestBody = {
                username: "Bob",
                email: "bob@email.com", //decodeURIComponent?
                profile: "../APIServer/uploads/user3.jpg",
                password: "1234"
            }
            return users.addUser(requestBody).then((user) => {
                u3 = user;
            });
        })
        .then((Bob) => {
            requestBody = {
                username: "Cate",
                email: "cate@email.com", //decodeURIComponent?
                profile: "../APIServer/uploads/user4.jpg",
                password: "1234"
            }
            return users.addUser(requestBody).then((user) => {
                u4 = user;
            });
        })
        .then((cate) => {
            request = {
                name: "SpiderMan",
                year: 2002,
                directors: ["Sam Raimi"],
                stars: ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe"],
                writers: ["Stan Lee", "Steve Ditko"],
                description: "When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
                category: "Action",
                poster: "../APIServer/uploads/1.1.jpg",
                screenShots: ["../APIServer/uploads/1.1.jpg", "../APIServer/uploads/1.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m1 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "IronMan",
                year: 2008,
                directors: ["Jon Favreau"],
                stars: ["Robert Downey Jr", "Gwyneth Paltrow", "Terrence Howard"],
                writers: ["Mark Fergus", "Hawk Ostby"],
                description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
                category: "Action",
                poster: "../APIServer/uploads/2.1.jpg",
                screenShots: ["../APIServer/uploads/2.1.jpg", "../APIServer/uploads/2.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m2 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "The Avengers",
                year: 2012,
                directors: ["Joss Whedon"],
                stars: ["Robert Downey Jr", "Chris Evans", "Scarlett Johansson"],
                writers: ["Joss Whedon ", "Zak Penn"],
                description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                category: "Action",
                poster: "../APIServer/uploads/3.1.jpg",
                screenShots: ["../APIServer/uploads/3.1.jpg", "../APIServer/uploads/3.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m3 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Thor: Ragnarok",
                year: 2017,
                directors: ["Taika Waititi"],
                stars: ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett"],
                writers: ["Eric Pearson", "Craig Kyle"],
                description: "Imprisoned, the almighty Thor finds himself in a lethal gladiatorial contest against the Hulk, his former ally. Thor must fight for survival and race against time to prevent the all-powerful Hela from destroying his home and the Asgardian civilization.",
                category: "Action",
                poster: "../APIServer/uploads/4.1.jpg",
                screenShots: ["../APIServer/uploads/4.1.jpg", "../APIServer/uploads/4.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m4 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Harry Potter and the Sorcerer's Stone",
                year: 2001,
                directors: ["Chris Columbus"],
                stars: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris"],
                writers: ["J.K. Rowling", "Steve Kloves"],
                description: "Rescued from the outrageous neglect of his aunt and uncle, a young boy with a great destiny proves his worth while attending Hogwarts School of Witchcraft and Wizardry.",
                category: "Fiction",
                poster: "../APIServer/uploads/5.1.jpg",
                screenShots: ["../APIServer/uploads/5.1.jpg", "../APIServer/uploads/5.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m5 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Harry Potter and the Prisoner of Azkaban",
                year: 2004,
                directors: ["Alfonso Cuarón"],
                stars: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris"],
                writers: ["J.K. Rowling", "Steve Kloves"],
                description: "It's Harry's third year at Hogwarts; not only does he have a new Defense Against the Dark Arts teacher, but there is also trouble brewing. Convicted murderer Sirius Black has escaped the Wizards' Prison and is coming after Harry.",
                category: "Fiction",
                poster: "../APIServer/uploads/6.1.jpg",
                screenShots: ["../APIServer/uploads/6.1.jpg", "../APIServer/uploads/6.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m6 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Harry Potter and the Chamber of Secrets ",
                year: 2002,
                directors: ["Alfonso Cuarón"],
                stars: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris"],
                writers: ["J.K. Rowling", "Steve Kloves"],
                description: "Harry ignores warnings not to return to Hogwarts, only to find the school plagued by a series of mysterious attacks and a strange voice haunting him.",
                category: "Fiction",
                poster: "../APIServer/uploads/7.1.jpg",
                screenShots: ["../APIServer/uploads/7.1.jpg", "../APIServer/uploads/7.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m7 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Harry Potter and the Half-Blood Prince",
                year: 2009,
                directors: ["Alfonso Cuarón"],
                stars: ["Daniel Radcliffe", "Rupert Grint", "Richard Harris"],
                writers: ["J.K. Rowling", "Steve Kloves"],
                description: "As Harry Potter begins his sixth year at Hogwarts, he discovers an old book marked as the property of the Half-Blood Prince and begins to learn more about Lord Voldemort's dark past.",
                category: "Fiction",
                poster: "../APIServer/uploads/8.1.jpg",
                screenShots: ["../APIServer/uploads/8.1.jpg", "../APIServer/uploads/8.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m8 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "The Punisher",
                year: 2004,
                directors: ["Jonathan Hensleigh"],
                stars: ["Thomas Jane", "John Travolta", "Samantha Mathis"],
                writers: ["Jonathan Hensleigh", "Michael France"],
                description: "An undercover FBI agent becomes a vigilante assassin and sets out to unleash his wrath upon the corrupt businessman who slaughtered his entire family at a reunion.",
                category: "Horror",
                poster: "../APIServer/uploads/9.1.jpg",
                screenShots: ["../APIServer/uploads/9.1.jpg", "../APIServer/uploads/9.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m9 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Murder on the Orient Express",
                year: 2017,
                directors: ["Kenneth Branagh"],
                stars: ["Kenneth Branagh", "Penélope Cruz", "Willem Dafoe"],
                writers: ["Michael Green", "Agatha Christie"],
                description: "When a murder occurs on the train he's travelling on, celebrated detective Hercule Poirot is recruited to solve the case.",
                category: "Horror",
                poster: "../APIServer/uploads/10.1.jpg",
                screenShots: ["../APIServer/uploads/10.1.jpg", "../APIServer/uploads/10.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m10 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Three Billboards Outside Ebbing, Missouri",
                year: 2017,
                directors: ["Martin McDonagh"],
                stars: ["Frances McDormand", "Woody Harrelson", "Sam Rockwell"],
                writers: ["Martin McDonagh"],
                description: "A mother personally challenges the local authorities to solve her daughter's murder when they fail to catch the culprit.",
                category: "Horror",
                poster: "../APIServer/uploads/11.1.jpg",
                screenShots: ["../APIServer/uploads/11.1.jpg", "../APIServer/uploads/11.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m11 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Alien",
                year: 1979,
                directors: ["Ridley Scott"],
                stars: ["Sigourney Weaver", "Tom Skerritt", "John Hurt"],
                writers: ["Dan O'Bannon", "Ronald Shusett"],
                description: "After a space merchant vessel perceives an unknown transmission as a distress call, its landing on the source moon finds one of the crew attacked by a mysterious lifeform, and they soon realize that its life cycle has merely begun.",
                category: "Horror",
                poster: "../APIServer/uploads/12.1.jpg",
                screenShots: ["../APIServer/uploads/12.1.jpg", "../APIServer/uploads/12.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m12 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Coco",
                year: 2017,
                directors: ["Lee Unkrich", "Adrian Molina"],
                stars: ["Anthony Gonzalez", "Gael García Bernal", "Benjamin Bratt"],
                writers: ["Lee Unkrich ", "Jason Katz"],
                description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
                category: "Animation",
                poster: "../APIServer/uploads/13.1.jpg",
                screenShots: ["../APIServer/uploads/13.1.jpg", "../APIServer/uploads/13.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m13 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Spirited Away",
                year: 2001,
                directors: ["Hayao Miyazaki", "Kirk Wise"],
                stars: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
                writers: ["Hayao Miyazaki"],
                description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
                category: "Animation",
                poster: "../APIServer/uploads/14.1.jpg",
                screenShots: ["../APIServer/uploads/14.1.jpg", "../APIServer/uploads/14.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m14 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "My Neighbor Totoro",
                year: 1988,
                directors: ["Hayao Miyazaki"],
                stars: ["Hitoshi Takagi", "Noriko Hidaka", "Chika Sakamoto"],
                writers: ["Hayao Miyazaki"],
                description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
                category: "Animation",
                poster: "../APIServer/uploads/15.1.jpg",
                screenShots: ["../APIServer/uploads/15.1.jpg", "../APIServer/uploads/15.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m15 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Howl's Moving Castle",
                year: 2004,
                directors: ["Hayao Miyazaki", "Diana Wynne Jones"],
                stars: ["Chieko Baishô", "Takuya Kimura", "Tatsuya Gashûin"],
                writers: ["Hayao Miyazaki"],
                description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle.",
                category: "Animation",
                poster: "../APIServer/uploads/16.1.jpg",
                screenShots: ["../APIServer/uploads/16.1.jpg", "../APIServer/uploads/16.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m16 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Life Is Beautiful",
                year: 1997,
                directors: ["Roberto Benigni"],
                stars: ["Roberto Benigni", "Nicoletta Braschi", "Giorgio Cantarini"],
                writers: ["Vincenzo Cerami", "Roberto Benigni"],
                description: "When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor and imagination to protect his son from the dangers around their camp.",
                category: "Comedy",
                poster: "../APIServer/uploads/17.1.jpg",
                screenShots: ["../APIServer/uploads/17.1.jpg", "../APIServer/uploads/17.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m17 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Back to the Future",
                year: 1985,
                directors: ["Robert Zemeckis"],
                stars: ["Michael J. Fox", "Christopher Lloyd", "Lea Thompson"],
                writers: ["Robert Zemeckis", "Bob Gale"],
                description: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
                category: "Comedy",
                poster: "../APIServer/uploads/18.1.jpg",
                screenShots: ["../APIServer/uploads/18.1.jpg", "../APIServer/uploads/18.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m18 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Amélie",
                year: 1985,
                directors: ["Jean-Pierre Jeunet"],
                stars: ["Audrey Tautou", "Mathieu Kassovitz", "Rufus"],
                writers: ["Guillaume Laurant", "Jean-Pierre Jeunet"],
                description: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
                category: "Comedy",
                poster: "../APIServer/uploads/19.1.jpg",
                screenShots: ["../APIServer/uploads/19.1.jpg", "../APIServer/uploads/19.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m19 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Rang De Basanti",
                year: 2006,
                directors: ["Rakeysh Omprakash Mehra"],
                stars: ["Aamir Khan", "Soha Ali Khan", "Siddharth"],
                writers: ["Renzil D'Silva", "Prasoon Joshi"],
                description: "The story of six young Indians who assist an English Woman to film a documentary on the extremist freedom fighters from their past, and the events that lead them to relive the long forgotten saga of freedom.",
                category: "Comedy",
                poster: "../APIServer/uploads/20.1.jpg",
                screenShots: ["../APIServer/uploads/20.1.jpg", "../APIServer/uploads/20.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m20 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Dag II",
                year: 2016,
                directors: ["Alper Caglar"],
                stars: ["Ozan Agaç", "Bedii Akin", "Murat Arkin"],
                writers: ["Alper Caglar"],
                description: "In a desolate war zone where screams of the innocent echo, on the very line between disaster and valor, 7 Maroon Berets will dance with death.",
                category: "Drama",
                poster: "../APIServer/uploads/21.1.jpg",
                screenShots: ["../APIServer/uploads/21.1.jpg", "../APIServer/uploads/21.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m21 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "The Dark Knight",
                year: 2008,
                directors: ["Christopher Nolan"],
                stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
                writers: ["Christopher Nolan"],
                description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                category: "Drama",
                poster: "../APIServer/uploads/22.1.jpg",
                screenShots: ["../APIServer/uploads/22.1.jpg", "../APIServer/uploads/22.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m22 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "The Godfather",
                year: 1972,
                directors: ["Francis Ford Coppola"],
                stars: ["Marlon Brando", "Al Pacino", "James Caan"],
                writers: ["Francis Ford Coppola"],
                description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
                category: "Drama",
                poster: "../APIServer/uploads/23.1.jpg",
                screenShots: ["../APIServer/uploads/23.1.jpg", "../APIServer/uploads/23.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m23 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "The Godfather II",
                year: 1974,
                directors: ["Francis Ford Coppola"],
                stars: ["Robert De Niro", "Al Pacino", "Robert Duvall"],
                writers: ["Francis Ford Coppola"],
                description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
                category: "Drama",
                poster: "../APIServer/uploads/24.1.jpg",
                screenShots: ["../APIServer/uploads/24.1.jpg", "../APIServer/uploads/24.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m24 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Forrest Gump",
                year: 1994,
                directors: ["Robert Zemeckis"],
                stars: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
                writers: ["Winston Groom", "Eric Roth"],
                description: "JFK, LBJ, Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
                category: "Romantic",
                poster: "../APIServer/uploads/25.1.jpg",
                screenShots: ["../APIServer/uploads/25.1.jpg", "../APIServer/uploads/25.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m25 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Dil Chahta Hai",
                year: 2001,
                directors: ["Farhan Akhtar"],
                stars: ["Aamir Khan", "Saif Ali Khan", "Akshaye Khanna"],
                writers: ["Farhan Akhtar", "Kassim Jagmagia"],
                description: "Three inseparable childhood friends are just out of college. Nothing comes between them - until they each fall in love, and their wildly different approaches to relationships creates tension.",
                category: "Romantic",
                poster: "../APIServer/uploads/26.1.jpg",
                screenShots: ["../APIServer/uploads/26.1.jpg", "../APIServer/uploads/26.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m26 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "La La Land",
                year: 2016,
                directors: ["Damien Chazelle"],
                stars: ["Ryan Gosling", "Emma Stone", "Rosemarie DeWitt"],
                writers: ["Damien Chazelle"],
                description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
                category: "Romantic",
                poster: "../APIServer/uploads/27.1.jpg",
                screenShots: ["../APIServer/uploads/27.1.jpg", "../APIServer/uploads/27.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m27 = movie;
            });
        })
        .then((movie) => {
            request = {
                name: "Ah-ga-ssi",
                year: 2016,
                directors: ["Chan-wook Park"],
                stars: ["Min-hee Kim", "Jung-woo Ha,", "Jin-woong Jo"],
                writers: ["Chan-wook Park"],
                description: "A woman is hired as a handmaiden to a Japanese heiress, but secretly she is involved in a plot to defraud her.",
                category: "Romantic",
                poster: "../APIServer/uploads/28.1.jpg",
                screenShots: ["../APIServer/uploads/28.1.jpg", "../APIServer/uploads/28.2.jpg"]
            }
            return movies.addMovie(request).then((movie) => {
                m28 = movie;
            });
        })
        .then((movie) => {
            return users.addToWatchedList(u1._id, m1._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u1._id, m8._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u1._id, m11._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u2._id, m2._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u3._id, m4._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u3._id, m6._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u4._id, m3._id)
        })
        .then((movie) => {
            return users.addToWatchedList(u4._id, m5._id)
        })
        .then((movie) => {
            return users.addToWishList(u1._id, m3._id)
        })
        .then((movie) => {
            return users.addToWishList(u1._id, m2._id)
        })
        .then((movie) => {
            return users.addToWishList(u2._id, m6._id)
        })
        .then((movie) => {
            return users.addToWishList(u2._id, m7._id)
        })
        .then((movie) => {
            return users.addToWishList(u3._id, m9._id)
        })
        .then((movie) => {
            return users.addToWishList(u3._id, m10._id)
        })
        .then((movie) => {
            return users.addToWishList(u3._id, m11._id)
        })
        .then((movie) => {
            return users.addToWishList(u4._id, m12._id)
        })
        .then((list) => {
            requestBody = {
                userId: u1._id,
                movieId: m1._id,
                username: u1.username,
                content: "good",
                rating: 4,
                date: "09/09/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u2._id,
                movieId: m2._id,
                username: u2.username,
                content: "nice",
                rating: 4.5,
                date: "09/10/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u3._id,
                movieId: m4._id,
                username: u3.username,
                content: "great",
                rating: 4.4,
                date: "07/09/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u4._id,
                movieId: m3._id,
                username: u4.username,
                content: "not bad",
                rating: 4.8,
                date: "10/09/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u4._id,
                movieId: m2._id,
                username: u4.username,
                content: "it is good",
                rating: 4.8,
                date: "10/11/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u4._id,
                movieId: m3._id,
                username: u4.username,
                content: "best!!!!!",
                rating: 4.8,
                date: "10/20/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u4._id,
                movieId: m5._id,
                username: u4.username,
                content: "best movie",
                rating: 5,
                date: "10/25/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u3._id,
                movieId: m6._id,
                username: u3.username,
                content: "I like it",
                rating: 4.7,
                date: "10/27/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u2._id,
                movieId: m7._id,
                username: u2.username,
                content: "do not like it",
                rating: 3.7,
                date: "10/07/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        }).then((comment) => {
            requestBody = {
                userId: u1._id,
                movieId: m8._id,
                username: u1.username,
                content: "it is common",
                rating: 4.2,
                date: "10/25/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u2._id,
                movieId: m9._id,
                username: u2.username,
                content: "almost perfect",
                rating: 4.9,
                date: "10/05/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u4._id,
                movieId: m9._id,
                username: u4.username,
                content: "I like this movie",
                rating: 4.8,
                date: "10/15/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u3._id,
                movieId: m10._id,
                username: u3.username,
                content: "can be better",
                rating: 3.9,
                date: "10/19/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u2._id,
                movieId: m11._id,
                username: u2.username,
                content: "perfect !!!!!",
                rating: 5,
                date: "10/21/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                userId: u1._id,
                movieId: m11._id,
                username: u1.username,
                content: "good !!!!!",
                rating: 4.7,
                date: "10/28/2017"
            }
            return comments.addComment(requestBody.userId, requestBody.movieId, requestBody.username, requestBody.content, requestBody.rating, requestBody.date);
        })
        .then((comment) => {
            requestBody = {
                senderName: u1.username,
                receiverName: u2.username,
                movieName: m1.name,
                message: "love this"
            }
            return sharemessages.addMessage(requestBody.senderName, requestBody.receiverName, requestBody.movieName, requestBody.message);
        })
        .then((comment) => {
            requestBody = {
                senderName: u2.username,
                receiverName: u3.username,
                movieName: m2.name,
                message: "nice"
            }
            return sharemessages.addMessage(requestBody.senderName, requestBody.receiverName, requestBody.movieName, requestBody.message);            
        })
        .then((comment) => {
            requestBody = {
                senderName: u3.username,
                receiverName: u1.username,
                movieName: m4.name,
                message: "good!!!!!!!"
            }
            return sharemessages.addMessage(requestBody.senderName, requestBody.receiverName, requestBody.movieName, requestBody.message);            
        })
        .then((comment) => {
            requestBody = {
                senderName: u4.username,
                receiverName: u2.username,
                movieName: m1.name,
                message: "interesting"
            }
            return sharemessages.addMessage(requestBody.senderName, requestBody.receiverName, requestBody.movieName, requestBody.message);            
        })
        .then(() => {
            console.log("Done seeding database");
            db.close();
        });
}, (error) => {
    console.error(error);
});
