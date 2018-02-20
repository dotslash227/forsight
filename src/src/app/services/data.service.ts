import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

    items: any;
    constructor(public http: Http) {
        this.items = [
            {title: 'one'},
            {title: 'two'},
            {title: 'three'},
            {title: 'four'},
            {title: 'five'},
            {title: 'six'},
            {title: 'hello'},
            {title: 'this'},
            {title: 'is'},
            {title: 'ionic'},
            {title: 'angular'},
            {title: 'hybrid'},
            {title: 'application'},
        ]
    }

    filterItems(searchTerm){

        return this.items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }

}
