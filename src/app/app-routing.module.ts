import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { AppAuthGuard } from './app.authguard';
import { UserAccountComponent } from './user-account/user-account.component';
import { AppPublicAuthGuard } from './app.publicauthguard';

const routes: Routes = [
  { 
    path: '',
    component: ProductSearchComponent,
    // canActivate: [AppPublicAuthGuard], 
    // data: { roles: ['user'] } 
  },
  {
    path: 'signup',
    component: UserRegistrationComponent,
    // canActivate: [AppPublicAuthGuard], 
    // data: { roles: ['user'] } 
  },
  { 
    path: 'products',
    component: ProductSearchComponent,
    // canActivate: [AppPublicAuthGuard], 
    // data: { roles: ['user'] } 
  },
  { 
    path: 'account',
    component: UserAccountComponent,
    canActivate: [AppAuthGuard], 
    data: { roles: ['user'] }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppAuthGuard, AppPublicAuthGuard]
})
export class AppRoutingModule { }