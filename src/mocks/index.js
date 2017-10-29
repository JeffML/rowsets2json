import casual from 'casual';
import RandExp from 'randexp';
import {
    startCase
} from 'lodash';

const title = () => (
    startCase(casual.catch_phrase)
);

var authors = [
    {
        first: "Steven",
        last: "King",
        titles: ["Scary Stuff", "More Scary Stuff", "Scariest Stuff", title()],
        category: ["suspense", "occult"]
    },
    {
        first: "Arthur",
        last: "Doyle",
        titles: ["The Pound Puppies of the Baskervilles", "The Case of the Mashed Potato", "The Case of the Spotted Dick", title()],
        category: ["mystery", "thriller"]
    },
    {
        first: "Isaac",
        last: "Asimov",
        titles: ["Fourth Foundation", "I, Morty", "Once in a Venusian Sun", title()],
        category: ["science fiction", "science", "general interest"]
    },
    {
        first: "R. L.",
        last: "Stein",
        titles: ["Moose Bumps", "Meerkat Street", "Why are You Scared of Me?", title()],
        category: ["childrens books", "suspense", "thriller"]
    },
    {
        first: "Barbara",
        last: "Cartland",
        titles: ["Kiss Me, I'm Yours", "The Pirate and the Piano Teacher", "Love, Who Needs It?", title()],
        category: ["romance", "thriller"]
    }
];

const moreAuthors = () => {
    const count = 7;
    var arr = [];

    for (let i = 0; i < count; i++) {
        arr.push({
            first: casual.first_name,
            last: casual.last_name,
            titles: [title(), title(), title()],
            category: ["management", "engineering", "reference"]
        })
    }
    return arr;
}

authors = authors.concat(moreAuthors());

class Rowset {
    constructor() {
        this.rowset = casual.book;
    }

    getRowSetObject() {
        return this.rowset
    };
    getRowSetArray() {
        return Object.values(this.rowset)
    }
}

casual.define('book', () => {
    const author = casual.random_element(authors);

    const book = {
        first_name: author.first,
        last_name: author.last,
        title: casual.random_element(author.titles),
        category: casual.random_element(author.category)
    }

    return book;
});

export default Rowset
