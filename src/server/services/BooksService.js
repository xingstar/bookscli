/*
 * @Author: ministar 
 * @Date: 2019-07-15 16:59:48 
 * @Last Modified by: ministar
 * @Last Modified time: 2019-07-16 14:24:31
 */

import SafeRequest from '../utils/SafeRequest';
/**
 *
 *
 * @class BooksService
 */
class BooksService{
    constructor(app){
        this.app = app;
    }

    
    /**
     *
     *
     * @param {*} options
     * @returns
     * @memberof BooksService
     */
    getData(options){
        const url = "books/index";
        const safeRequest = new SafeRequest(options.url);

        return safeRequest.fetch();
    }
}

export default BooksService;