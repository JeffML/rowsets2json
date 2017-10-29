import alasql from 'alasql';

alasql(
    `CREATE TABLE author
        (id INT PRIMARY KEY AUTO_INCREMENT,
        first_name STRING,
        last_name STRING);

    CREATE TABLE book
        (id INT PRIMARY KEY AUTO_INCREMENT,
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

const selectBooks = (options) => {
    options = options || {}
    var query;
    const whereCategory = options.category ? `AND category = '${options.category}'` : ``

    if (!options.author) {
        query =
            `       SELECT title, category
                    FROM book
                    WHERE 1
                    ${whereCategory}
                    `;
    } else {
        const whereName = options.author.last_name ? `AND last_name = '${options.author.last_name}'` : ``
        query =
            `    SELECT title, category, first_name, last_name
                 FROM book
                 JOIN author ON author.id = book.author
                 WHERE 1
                 ${whereCategory}
                 ${whereName}
                 `;
    }

    console.log({
        query
    })
    return alasql(
        query
    )
}

export {
    addEntities,
    selectBooks
}
