import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ContactPage } from '../contact/contact';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private _db: AngularFireDatabase) { }

  myInput = new FormControl;
  results = Observable.of([])
    .merge(this.myInput.valueChanges)
    .filter(v => v.length > 1)
    .switchMap(v => this._db.list("medicamentos", ref => ref.orderByChild("nome")).valueChanges()
      .map(resul => resul.filter(element => this.inLowerCaseAndWithoutAccent(element["nome"]).includes(this.inLowerCaseAndWithoutAccent(v)))))
    .map(json => json)
    .retry(2);

  navegarParaListagemDeUnidades(remedio: any) {
    this.navCtrl.push(ContactPage, { remedioSelecionado: remedio });
  }

  private inLowerCaseAndWithoutAccent(term: string): string {
    return _.deburr(term).toLowerCase();
  }
}