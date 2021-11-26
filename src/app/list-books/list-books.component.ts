import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { BookService } from '../API/book.service';
import { books } from '../books';
import { Books } from '../models/Books';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss'],
})
export class ListBooksComponent implements OnInit {

  // public allBooks;
  public allBooks$: Observable<Books[]>;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.allBooks$ = this.bookService.getAllBooks().pipe(tap(e => console.warn(e)));
    // this.allBooks = books;
  }

  filterByTitle(event) {
    // L'evenement est = à la valeur inscrit en paramètre (ici event)
    const eventContent = event.target.value;
    // Permet d'afficher la liste filtré que si on a appuyé sur entrer ET que la taille de l'evenemnt est supérieur à 0 caractère
    if (event.key == 'Enter' && eventContent.length > 0) {
      // On utilise la fonction filter présent dans le service d'exemple
      this.allBooks$ = this.bookService.applicationFilterByTitle(eventContent).pipe(tap(e => console.warn(e)));
      this.allBooks$.subscribe(data => console.warn(data)
      )
    } else {
      // Si la taille = 0 et qu'on a pas appuyé sur entrer alors on affiche toute la liste sans filtre
      this.allBooks$ = this.bookService.getAllBooks().pipe(tap(e => console.warn(e)));
    }
  }




}

