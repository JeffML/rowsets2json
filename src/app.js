import Rowset from './mocks';

for (let i = 0; i < 10; i++) {
    const rs = new Rowset();
    console.log(rs.getRowSetObject());
}
