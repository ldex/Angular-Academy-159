import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService, FavouriteService } from "@app/products";
import { Observable, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fadeInAnimation } from '@app/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  // make the animation available to this component
  animations: [fadeInAnimation],
  // attach the animation to the host (root) element of this component
  host: { '[@fadeInAnimation]': ''}
})
export class ProductListComponent implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
   
  }

  title = 'Products';
 // products: Product[];
  products$: Observable<Product[]>;
  selectedProduct: Product;
  message: string;
  errorMessage: string;
  sorter: string = "-modifiedDate";
  productsNb: number = 0;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  currentPage: number = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.currentPage--;
    this.selectedProduct = null;
  }
  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.currentPage++;
    this.selectedProduct = null;
  }


  sortList(propertyName: string) {
    this.sorter = this.sorter.startsWith('-') ? propertyName : '-'+propertyName;
  }

  newFavourite(product: Product) {
    this.message = `Product 
                    ${product.name} 
                    added to your favourites!`;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  get favourites(): number {
    return this.favouriteService.getFavouritesNb();
  }

  constructor(
    private productService: ProductService,
    private favouriteService: FavouriteService,
    private router: Router) { 

  }

  ngOnInit() {

    this.products$ = this
                      .productService
                      .products$
                      .pipe(
                          tap(products => this.productsNb = products.length)
                        
                      );

    // this
    //   .productService
    //   .products$
    //   .subscribe(
    //     results => this.products = results
    //   )
  }

}
