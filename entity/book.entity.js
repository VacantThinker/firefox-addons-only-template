module.exports = {
  name: 'book',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    bookName: {
      type: 'varchar', default: '',
    },
    author: {
      type: 'varchar', default: '',
    },
    publishYear: {
      type: 'int', default: 0,
    },
    pageNumber: {
      type: 'int', default: 0,
    },
  },
};