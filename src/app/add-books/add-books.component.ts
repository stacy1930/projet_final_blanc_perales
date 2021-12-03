import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../API/book.service';
import { genres } from '../genre';
import { Genre } from '../models/Genre';
import { tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {

  public allGenres$: Observable<Genre[]>;

  allGenres;
  submitted: Boolean = false;

  createBookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    genreId: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private bookService: BookService, private formBuilder: FormBuilder, private faio: FingerprintAIO) { }

  ngOnInit() {
    this.allGenres$ = this.bookService.getAllGenres().pipe(tap(e => console.warn(e)));
  }

  onSubmit() {
    this.submitted = true;

    this.faio.isAvailable()
      .then(
        res => this.faio.show({
          title: 'Ajouter le livre',
          subtitle: 'Vérification Touch ID',
          description: 'Veuillez scanner votre doigt ou votre face ID'
        }).then((result: any) =>
          this.bookService.addBook(this.createBookForm.value).subscribe(
            (response) => (
              console.log("Success ADD !", response)
            ),
            (error) => (
              console.error("Error ADD !", error)
            )
          ))
          .catch((error: any) => alert('ERROR TU PEUX PAS ADD'))
        ,
        err => alert('TouchID is not available'),
      );




    console.log(this.createBookForm.value);

  }

}
