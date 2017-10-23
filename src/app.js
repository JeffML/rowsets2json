import Rowset from './mocks';

for (let i = 0; i < 20; i++) {
    const rs = new Rowset();
    console.log(rs.getRowSetObject());
}
