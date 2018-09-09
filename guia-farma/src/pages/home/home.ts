import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Geolocation]
})
export class HomePage {
  localizacao: Geoposition;

  constructor(public navCtrl: NavController, private _geolocation: Geolocation) { }

  ionViewDidLoad(): void {
    this._geolocation.getCurrentPosition().then(
      sucesso => this.localizacao = sucesso,
      erro => this.localizacao = erro
    )
  }

  navegarParaPesquisaDeRemedios() {
    this.navCtrl.push(AboutPage);
  }
}
