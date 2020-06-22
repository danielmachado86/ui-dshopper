import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChildren("boxes") private boxes: QueryList<ElementRef>;

  products: Product[];
  selectedProduct: Product;
  prevIndex: number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  toggleBox(index: number) {
    this.selectedProduct = this.products[index];
    this.productDetailDisplay(index);
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
