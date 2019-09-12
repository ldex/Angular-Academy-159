import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderBy } from './orderBy.pipe';
import { WithLoadingPipe } from './with-loading.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { ProductInsertComponent } from './product-insert/product-insert.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    OrderBy,
    WithLoadingPipe,
    ProductInsertComponent
  ],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
