'use strict';

import Dexie from 'dexie';

export const db = new Dexie('firefox-addons-only-template');
db.version(1).stores({
  books: '&id, bookName, author, publishYear, pageNumber',

});

