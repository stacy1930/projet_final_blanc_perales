import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Books } from '../models/Books';
import { Genre } from '../models/Genre';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiBook = 'http://localhost:8080/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Books[]> {
    return this.http.get<Books[]>(`${this.apiBook}livre`, this.httpOptions);
  }

  // FILTER BY NAME
  applicationFilterByTitle(title: string): Observable<Books[]> {
    let urlFilter = this.apiBook + 'livre?title=' + title;
    return this.http.get<Books[]>(urlFilter, this.httpOptions);
  }

  getBookById(id: number): Observable<Books> {
    return this.http.get<Books>(`${this.apiBook}livre/${id}`, this.httpOptions);
  }

  addBook(book: Books): Observable<Books> {
    return this.http.post<Books>(
      `${this.apiBook}/book`,
      book,
      this.httpOptions
    );
  }

  deleteBook(
    book: Books | number
  ): Observable<Books> {
    const id = typeof book === 'number' ? book : book.id;
    return this.http.delete<Books>(
      `${this.apiBook}livre/${id}`,
      this.httpOptions
    );
  }


  updateBook(book: Books, id: number): Observable<any> {
    return this.http.put(`${this.apiBook}/${id}`, book, this.httpOptions);
  }



  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiBook}genre`, this.httpOptions);
  }

}
