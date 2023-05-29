'use strict';

import {db} from './db.js'

const table = {
  
  // book.entity.js
  // **************************************************************************
  /**
   * ({ id:1, name: 'mary'}); // &id
   *
   * ({ name: 'mary'}); // ++id
   *
   * insert book
   * @param entityObj {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<void>}
   */
  bookInsert: async (entityObj) => {
    await db.books.add(entityObj);
  },
  /**
   * ({id:1});
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<boolean>}
   */
  bookDelete: async (options) => {
    let find = await db.books.get(options)
    if(find){
      let primaryKeyValue = find['id']
      return await db.books.delete(primaryKeyValue);
    }else{
      return true
    }
  },
  /**
   * ({id:1});
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<boolean>}
   */
  bookDeleteAll: async (options) => {
    const searchKey = String(Object.keys(options)[0]);
    const searchVal = String(Object.values(options)[0]);
    return await db.books.where(searchKey).equals(searchVal).delete()
  },
  /**
   * ({name: 'jessica'}, {id: 1})
   * @param bookNew {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   */
  bookUpdate: async (bookNew, options) => {
    let find = await db.books.get(options)
    let primaryKeyValue = find['id']
    await db.books.update(primaryKeyValue, bookNew)
  },
  /**
   * ({color: 'yellow'});// update all color='yellow'
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<void>}
   */
  bookUpdateAll: async (options) => {
    await db.books.toCollection().modify((book) => {
      book = Object.assign(book, options);
    });
  },
  /**
   * {id: 1}
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<null|{id?: number, bookName: string, author: string, publishYear: number, pageNumber: number, }>}
   */
  bookFindOneWhere: async (options) => {
    let ret = await db.books.get(options)
    return ret ? ret : null
  },
  /**
   * find all book
   * @returns {Promise<[{id?: number, bookName: string, author: string, publishYear: number, pageNumber: number, }]>}
   */
  bookFind: async () => {
    return await db.books.toArray()
  },
  /**
   * {id: 1}
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<[{id?: number, bookName: string, author: string, publishYear: number, pageNumber: number, }]>}
   */
  bookFindWhere: async (options) => {
    const searchKey = String(Object.keys(options)[0]);
    const searchVal = String(Object.values(options)[0]);
    return await db.books.where(searchKey).equals(searchVal).toArray()
  },
  /**
   * {id: 1}
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<number>}
   */
  bookCount: async (options) => {
    const searchKey = String(Object.keys(options)[0]);
    const searchVal = String(Object.values(options)[0]);
    return await db.books.where(searchKey).equals(searchVal).count()
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options {Object:{bookName?: string, author?: string, publishYear?: number, pageNumber?: number, id?: number, }}
   * @returns {Promise<[{id?: number, bookName: string, author: string, publishYear: number, pageNumber: number, }]>}
   */
  bookFindWhereLike: async (options) => {
    const searchKey = String(Object.keys(options)[0]);
    const searchVal = String(Object.values(options)[0]);
    let regExp = new RegExp(searchVal, "i");
    return await db.books.filter((item) =>
      regExp.test(item[searchKey])
    ).toArray()
  },


}

export {
  table
}
