import Rowset from './mocks';

const dataset = new Array(100)
    .fill()
    .map(a => new Rowset()
        .getRowSetObject());

console.log({
    dataset
})
