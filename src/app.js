import Rowset from './mocks';
import {
    addEntities,
    selectBooks
} from './sql-db';

import {
    handrolled
} from './methods'

const dataset = new Array(100)
    .fill()
    .map(a => new Rowset()
        .getRowSetObject());

addEntities(dataset)

const resultSet = selectBooks({
    author: {
        // last_name: "Asimov"
    }
})

var rs = handrolled(resultSet)
console.log(JSON.stringify({
    handrolled: rs
}, null, 4));
