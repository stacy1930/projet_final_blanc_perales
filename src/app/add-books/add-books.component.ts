import { Component, OnInit } from '@angular/core';
import { genres } from '../genre';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {

  allGenres;
  constructor() { }

  ngOnInit() {
    this.allGenres = genres;
  }

}
