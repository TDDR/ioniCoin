import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const COIN_KEY = 'id'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

   addCoin(coinToken: string){
     return this._storage.get(COIN_KEY).then((tokens: string[]) => {
       if(tokens){
         if(!tokens.includes(coinToken)){
            tokens.push(coinToken);
          }
         return this._storage.set(COIN_KEY, tokens);
       }
       else{
        return this._storage.set(COIN_KEY, [coinToken]);
       }
     })
   }

  getCoinTokens(){
    return this._storage.get(COIN_KEY);
  }

  deleteCoin(id: string) {
    return this._storage.get(COIN_KEY).then((tokens: string[]) => {
      if (!tokens || tokens.length ===0){
        return null;
      }

      let toKeep: string[] = [];
      for(let token of tokens){
        if(token !== id){
          toKeep.push(token);
        }
      }
      return this._storage.set(COIN_KEY, toKeep);
    })
  }
}
