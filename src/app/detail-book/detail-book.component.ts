import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookService } from '../API/book.service';
import { Books } from '../models/Books';
import { Genre } from '../models/Genre';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss'],
})
export class DetailBookComponent implements OnInit {

  public id;
  public book$: Observable<Books>;
  public allGenres$: Observable<Genre[]>;

  constructor(
    private pdfGenerator: PDFGenerator,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    public alertController: AlertController,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.book$ = this.bookService.getBookById(this.id).pipe(tap(e => console.log(e)));

    this.allGenres$ = this.bookService.getAllGenres().pipe(tap(e => console.warn(e)));

  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Suppression du livre',
      message: 'Voulez-vous supprimer définitivement ce livre ?',
      // buttons: ['Cancel', 'Supprimer le livre'],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Supprimer le livre',
          handler: () => {
            console.log('Confirm Ok');
            // On utilise la fonction presente dans le service, on lui met en paramètre l'objet catégory en question
            this.bookService.deleteBook(Number(this.id)).subscribe(
              (response) => (
                // Si c'est un succès un met un console.log puis on utilise la fonction refresh qui permet de refresh la page
                console.log('Success !', response),
                this.router.navigate(['/books'])
              ),
              // Si il y a une erreur on met un consol d'erreur
              (error) => console.log('Error!', error)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  htmlSample: any;
  getPDF() {
    // this.htmlSample = document.getElementById('book-list').innerHTML;
    this.htmlSample = `<h1>${document.getElementById('title-book').innerHTML}</h1>
    ${document.getElementById('detail-book').innerHTML}
    `;
    let options = {
      documentSize: 'A4',
      type: 'share',
    }

    this.pdfGenerator.fromData(this.htmlSample, options).
      then(resolve => {
        // alert(resolve);
        console.log(resolve);

      }
      ).catch((err) => {
        alert(err);
      });
  }

  share() {
    // this.socialSharing.share("coucou");

    this.socialSharing.shareWithOptions({
      message: document.getElementById('detail-book').innerText,
      subject: `Mon livre favoris : ${document.getElementById('title-book').innerText}`,
      url: document.getElementById('url-image').innerText
    })
  }

}
