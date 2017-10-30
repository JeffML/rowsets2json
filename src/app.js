import Rowset from './mocks';
import {
    addEntities,
    selectBooks
} from './sql-db';

import {
    handrolled,
    treeized,
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

const useMethod = process.env.METHOD || 'treeized'

if (useMethod === 'handrolled') {
    var rs = handrolled(resultSet)
    console.log(JSON.stringify({
        handrolled: rs
    }, null, 4));
}

if (useMethod === 'treeized') {
    var rs = treeized(resultSet)
    console.log(JSON.stringify({
        treeized: rs
    }, null, 4));
}

if (useMethod === 'treeizedReduced') {
    var rs = treeized(resultSet)

    rs = rs.map((r, k) => ({}[k] =
        r.categories.reduce((m, c) => {
            m[c.type] = {
                titles: c.titles.map(t => t.name)
            }
            return m;
        }, {})));

    console.log(JSON.stringify({
        treeizedReduced: rs
    }, null, 4));
}
