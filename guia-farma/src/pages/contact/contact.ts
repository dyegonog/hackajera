import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  remedio = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.remedio = this.navParams.get('remedioSelecionado');
  }
}