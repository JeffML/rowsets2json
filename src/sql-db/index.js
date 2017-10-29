import alasql from 'alasql';

alasql(
    `CREATE TABLE author
        (id INT PRIMARY KEY IDENTITY,
        first_name STRING,
        last_name STRING);

    CREATE TABLE book
        (id INT PRIMARY KEY IDENTITY,
        author INT REFERENCES author (id),
        title STRING,
        category STRING);
    `
);

const addEntities = (dataset) => {
    dataset.forEach(d => {
        d.title = d.title.replace(/'/, "''")

        const stmt =
            `
            IF NOT EXISTS (
                select * from author
                where first_name = '${d.first_name}'
                and last_name = '${d.last_name}')
            INSERT INTO author (first_name, last_name) VALUES('${d.first_name}', '${d.last_name}');

            IF NOT EXISTS (
                select * from book
                where title = '${d.title}'
                and category = '${d.category}')
            INSERT INTO book (title, category, author) VALUES('${d.title}', '${d.category}',
            (select id from author where first_name ='${d.first_name}' and last_name = '${d.last_name}'))
            `
        try {
            alasql(stmt)
        } catch (e) {
            console.error(stmt);
            throw (e);
        }

    })
};

export {
    addEntities
}
