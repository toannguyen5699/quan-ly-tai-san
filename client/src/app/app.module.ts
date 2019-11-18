import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent, NewComponent, ChangeAvatarComponent } from './home';
import { AdminComponent, InfoEmployeeComponent, UpdateEmployeeComponent } from './admin';
import { LoginComponent } from './login';
import {RegisterComponent} from './register/register.component';
import { RegisterEmployeeComponent } from './register-employee/register-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './admin/filter.pipe';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateProductComponent} from './list-product/create-product/create-product.component';
import { InfoNotificationComponent } from './notification/info-notification/info-notification.component';
import { ProductDisplayUserComponent } from './product-display-user/product-display-user.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
   imports: [
      NgbModule,
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      routing,
      FormsModule
   ],
   declarations: [
      AppComponent,
      HomeComponent,
      AdminComponent,
      LoginComponent,
      RegisterComponent,
      RegisterEmployeeComponent,
      FileSelectDirective,
      NewComponent,
      UpdateEmployeeComponent,
      ChangeAvatarComponent,
      InfoEmployeeComponent,
      FilterPipe,
      ListProductComponent,
      CreateProductComponent,
      InfoNotificationComponent,
      ProductDisplayUserComponent,
      MyCartComponent,
      OrderDetailComponent,
      NotificationComponent
   ],
   providers: [],
   entryComponents: [
      NewComponent,
      InfoEmployeeComponent,
      UpdateEmployeeComponent,
      ChangeAvatarComponent,
      CreateProductComponent,
      InfoNotificationComponent
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }