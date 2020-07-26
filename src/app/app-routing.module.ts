import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { AppAuthGuard } from './app.authguard';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { 
    path: '',
    component: ProductSearchComponent,
  },
  {
    path: 'signup',
    component: UserRegistrationComponent,
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
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }