import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductItem } from '../model/productItem';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private jsonUrl = './assets/data/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(this.jsonUrl);
  }

}
