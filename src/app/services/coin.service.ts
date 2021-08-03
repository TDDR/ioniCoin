import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Coin {
   id: string;
   name: string;
   symbol: string;
   rank: number;
   is_new: boolean;
   is_active: boolean;
   type: string;

   currentNumbers: CurrentNumbers;

   description: string;
   open_source: boolean;
   started_at: string;
   development_status: string;
   proof_type: string;
   org_structure: string;
   hash_algorithm: string;
}

interface CurrentNumbers {
   open: number;
   close: number;
   high: number;
   low: number;
   volume: number;
   market_cap: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  _url = "https://api.coinpaprika.com/v1/coins";

  constructor(private http: HttpClient) { }

  getAllCoins(){
    return this.http.get<Coin[]>(this._url);
  }

  getCurrentNumbers(id: string){
    return this.http.get<CurrentNumbers>(`${this._url}/${id}/ohlcv/today`);
  }

  getCoinById(id: string){
    return this.http.get<Coin>(`${this._url}/${id}`);
  }
}
