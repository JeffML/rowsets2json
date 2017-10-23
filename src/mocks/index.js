import casual from 'casual';
import RandExp from 'randexp';
import {
    startCase
} from 'lodash';

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

casual.define('book', () => ({
    last_name: casual.last_name,
    title: startCase(casual.catch_phrase),
    ISBN: new RandExp(/ISBN-\d-\d{3}-\d{5}-\d/)
        .gen(),
}))

export default Rowset
