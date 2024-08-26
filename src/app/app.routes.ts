import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { UserListComponent } from './user-list/user-list.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './welcome/welcome.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'edit-products', component: EditProductsComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
