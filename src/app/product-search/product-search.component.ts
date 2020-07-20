import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ProductService } from '../product.service'
import { Observable, Subject } from 'rxjs';
import { Product } from '../product';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  @ViewChildren("boxes") private boxes: QueryList<ElementRef>;
  private searchTerms = new Subject<string>();
  prevIndex: number;
  products: Product[];
  httpHeaderWithToken: HttpHeaders;
  isAuthenticated: boolean;


  constructor(
    private productService: ProductService,
    private authService: KeycloakService,
    private router: Router) { }

  getAccessToken2Header(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.authService.addTokenToHeader()
        .toPromise().then(
          httpHeaders => {
            console.log(httpHeaders);
            this.httpHeaderWithToken = httpHeaders;
            resolve();
          }, msg => {
            reject(msg);
          }
      );
    });
    return promise;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  async ngOnInit() {
    // this.isAuthenticated = await this.authService.isLoggedIn();
    // await this.getAccessToken2Header();
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProducts(term, this.httpHeaderWithToken)),
    )
    .subscribe(products => {
      this.products = products;
    });

  }
  
  toggleBox(index: number) {
    this.productDetailDisplay(index);

    if (index==this.prevIndex) {
      this.prevIndex=null;
      return;
    }
    
    if (this.prevIndex != null) {
      this.productDetailDisplay(this.prevIndex);
    }

    this.prevIndex = index;

  }

  private productDetailDisplay(index: number) {
    let nativeElement = this.boxes.toArray()[index].nativeElement;
    nativeElement.style.display =
      nativeElement.style.display === "none" || !nativeElement.style.display
        ? "block"
        : "none";
  }

}
