import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Coin, CoinService } from '../services/coin.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  coinTokens: string[] = [];
  favorites: Coin[] = [];

  constructor(private storage: StorageService,
              private coinService: CoinService,
              private router: Router
              ) { }

  ngOnInit() {
    this.loadCoins();
  }

  loadCoins(){
    this.storage.getCoinTokens().then(tokens => {
      this.coinTokens = tokens;

      for(let token of this.coinTokens){
        this.coinService.getCoinById(token).subscribe(response => {
          this.coinService.getCurrentNumbers(token).subscribe(res => {
            response.currentNumbers = res[0];
          })
          this.favorites.push(response);
        })
      }
    })
  }

  removeFromFavorites(id: string){
    this.storage.deleteCoin(id).then(() => {
      this.favorites = []
      this.loadCoins();
    })
  }

  homeClicked(){
    this.router.navigate(['']);
  }
}
