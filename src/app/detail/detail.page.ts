import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coin, CoinService } from '../services/coin.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public coin: Coin;

  constructor(private coinService: CoinService,
              private storage: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.coinService.getCoinById(id).subscribe( res => {
      this.coin = res
      this.coinService.getCurrentNumbers(id).subscribe(res => {
        this.coin.currentNumbers = res[0];
      })
    });
  }

  favoritesClicked(){
    this.router.navigate(['favorites'])
  }

  addToFavorites(coinToken: string){
    this.storage.addCoin(coinToken).then(() => {
      alert(`${coinToken} has been added to your favorites!`);
    })
  }

  homeClicked(){
    this.router.navigate(['']);
  }
}
