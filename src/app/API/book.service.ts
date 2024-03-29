import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Books } from '../models/Books';
import { Genre } from '../models/Genre';
import { shareReplay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  // apiBook = 'https://localhost:8080/';
  apiBook = 'https://projetmivre.herokuapp.com/';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',

    }),
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
      `${this.apiBook}livre`,
      book,
      this.httpOptions
    );
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(
      `${this.apiBook}genre`,
      genre,
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
    return this.http.put(`${this.apiBook}livre/${id}`, book, this.httpOptions);
  }

  getAllGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiBook}genre`, this.httpOptions);
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiBook}genre/${id}`, this.httpOptions);
  }

  private _listners = new BehaviorSubject<any>(false);

  private listen$ = this._listners.asObservable();
    listen(): Observable<any>{
      return this.listen$.pipe(shareReplay(1));
    }

    refresh(){
      this._listners.next(1);
    }

}
