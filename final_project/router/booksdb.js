let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": { fernando: "I like this so much" } },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

const getBookByISBN = (isbn) => {
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            const book = books[isbn]
            if (!book) rejected({ message: "Please, provide a valid isbn" })
        
            resolve(book)
        }, 1000)
    })
}

const filterBookByProperty = (property, value) => {
    return new Promise((resolve, rejected) => {
        setTimeout(() => {
            const keys = Object.keys(books)

            let key = keys.find(x => books[x][property] == value)
        
            if (!books[key]) rejected({ message: `Please, provide a valid property/value` })
        
            resolve({
                "book": books[key],
                "key": key
            })
        }, 1000)
    })
}

module.exports.books = books;
module.exports.getBookByISBN = getBookByISBN;
module.exports.filterBookByProperty = filterBookByProperty;
