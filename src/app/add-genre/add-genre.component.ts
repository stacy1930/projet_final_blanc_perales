import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../API/book.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss'],
})
export class AddGenreComponent implements OnInit {


  createBookForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(private router: Router,private bookService: BookService, private formBuilder: FormBuilder) { }

  ngOnInit() {}


  onSubmit() {

    console.log(this.createBookForm.value);

    this.bookService.addGenre(this.createBookForm.value).subscribe(
      (response) => (
        console.log("Success ADD !", response),
        this.router.navigate(['/books'])
      ),
      (error) => (
        console.error("Error ADD !", error)
      )
    )
  }


}
