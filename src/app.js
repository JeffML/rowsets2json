import Rowset from './mocks';
import {
    addEntities
} from './sql-db';

const dataset = new Array(100)
    .fill()
    .map(a => new Rowset()
        .getRowSetObject());

addEntities(dataset)
