const handrolled = (rs) => {
    const authors = {}

    rs.forEach(r => {
        const authname = [r.last_name, r.first_name].join(',');

        if (!authors[authname]) {
            authors[authname] = {
                categories: {}
            }
        }
        var author = authors[authname];

        if (!author.categories[r.category]) {
            author.categories[r.category] = {
                titles: []
            }
        }
        var category = author.categories[r.category]

        if (!category.titles.includes(r.title)) {
            category.titles.push(r.title)
        }
    })

    return authors;
}

import Treeize from 'treeize'

const treeized = rs => {
    var authors = new Treeize();

    const seed = rs.map(r => ({
        name: [r.last_name, r.first_name].join(', '),
        'categories:type': r.category,
        'categories:titles:name': r.title
    }))

    authors.grow(seed);
    return authors.getData();
}

export {
    handrolled,
    treeized,
}
