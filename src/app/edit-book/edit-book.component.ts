import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { BookService } from '../API/book.service';
import { Books } from '../models/Books';
import { Genre } from '../models/Genre';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {

  public allGenres$: Observable<Genre[]>;
  public book$: Observable<Books>;

  public idBook = Number(this.route.snapshot.paramMap.get('id'));

  submitted: Boolean = false;

  editBookForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private bookService: BookService) {
    this.editBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genreId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.allGenres$ = this.bookService.getAllGenres().pipe(tap(e => console.warn(e)));

    this.book$ = this.bookService
      .getBookById(this.idBook)
      .pipe(share(), tap(e => console.log(e)));

    this.book$.subscribe((book) =>
      this.editBookForm.patchValue({
        title: book.title,
        author: book.author,
        genreId: book.genreId,
        image: book.image,
        description: book.description
      })
    );
  }

  onEditSubmit() {
    console.log(this.editBookForm.value);

    // this.bookService
    //   .updateBook(this.editBookForm.value, this.idBook)
    //   .subscribe(
    //     (response) => (
    //       console.log('Success !', response),
    //       this.router.navigate(['/books'])
    //     ),
    //     (error) => console.error('Error!', error)
    //   );
  }

}
