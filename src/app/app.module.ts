import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTableModule} from 'angular5-data-table';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {CustomFormsModule} from 'ng2-validation';
import {environment} from '../environments/environment';
import {AdminModule} from './admin/admin.module';
import {AdminOrdersComponent} from './admin/components/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/components/admin-products/admin-products.component';
import {ProductFormComponent} from './admin/components/product-form/product-form.component';
import {AdminAuthGuard} from './admin/services/admin-auth-guard.service';
import {AppComponent} from './app.component';
import {BsNavbarComponent} from './bs-navbar/bs-navbar.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {ProductFilterComponent} from './products/product-filter/product-filter.component';
import {ProductsComponent} from './products/products.component';
import {AuthGuard} from './shared/services/auth-guard.service';
import {SharedModule} from './shared/shared.module';
import {ShippingFormComponent} from './shipping-form/shipping-form.component';
import {ShoppingCartSummaryComponent} from './shopping-cart-summary/shopping-cart-summary.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    LoginComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      {path: 'admin/products/new', component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products/:id', component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/products', component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'admin/orders', component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard]},
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
