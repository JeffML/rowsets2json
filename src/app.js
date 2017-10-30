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

    const rsr = rs.reduce((o, r) => {
        const rc = r.categories.reduce((oo, c) => {
            oo[c.type] = {
                titles: c.titles.map(t => t.name)
            }
            return oo;
        }, {})

        o[r.name] = {
            categories: rc
        };
        return o;
    }, {});

    console.log(JSON.stringify({
        treeizedReduced: rsr
    }, null, 4));
}
