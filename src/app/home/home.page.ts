import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { CoinService, Coin } from '../services/coin.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  coins: Coin[];

  constructor(private coinService: CoinService,
              private storage: StorageService,
              private router: Router) {}

  ngOnInit(){
    this.loadCoins();
  }

  loadCoins(){
    this.coinService.getAllCoins().subscribe(
      response => {
        this.coins = response.slice(0, 10); //Get a 429 http error if I save more than this
        for(let coin of this.coins){
          this.coinService.getCurrentNumbers(coin.id).subscribe(res => {
            coin.currentNumbers = res[0];
          })
        }
      }
    );
  }

  addToFavorites(coinToken: string, slidingItem: IonItemSliding){
    this.storage.addCoin(coinToken).then(() => {
      alert(`${coinToken} has been added to your favorites!`);
      slidingItem.close();
    })
  }

  favoritesClicked(){
    this.router.navigate(['favorites'])
  }
}
