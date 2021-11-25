import { Component, OnInit } from '@angular/core';
import { books } from '../books';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {

  public allBooks;
  constructor() { }

  ngOnInit() {
    this.allBooks = books;
  }

}
