import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { slideInOutAnimation } from '@app/animations';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // make the animation available to this component
  animations: [slideInOutAnimation],
  // attach the animation to the host (root) element of this component
  host: { '[@slideInOutAnimation]': ''}
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  product$: Observable<Product>;

  @Output() favouriteAdded = new EventEmitter<Product>();

  delete(product: Product) {
    if(window.confirm('Are you sure ??')) {
      this
      .productService
      .deleteProduct(product.id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.loadProducts();
          this.router.navigateByUrl('/products');
        },
        error => console.log('Could not delete product! ' + error)
      )
    }
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.favouriteService.addToFavourites(product);
  }

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];

    this.product$ =
              this
                .productService
                .products$
                .pipe(
                  flatMap(p => p),
                  filter(product => product.id === id)
                );
  }

}
