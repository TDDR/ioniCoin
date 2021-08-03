import { Component, OnInit, Input } from '@angular/core';
import { Coin } from '../services/coin.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss'],
})
export class CoinsComponent implements OnInit {
  @Input() coin: Coin;

  constructor() { }

  ngOnInit() {
  }
}
