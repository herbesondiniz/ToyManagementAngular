import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes  } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ToyListComponent } from '@components/toy-list/toy-list.component';
import { ToyFormComponent } from '@components/toy-form/toy-form.component';
import { StockListComponent } from '@components/stock-list/stock-list.component';
import { StockFormComponent } from '@components/stock-form/stock-form.component';
import { OrderListComponent} from '@components/order-list/order-list.component';
import { OrderFormComponent } from '@components/order-form/order-form.component';
import { OrderEditComponent } from '@components/order-edit/order-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/toys', pathMatch: 'full' },
  { path: 'toys', component: ToyListComponent },
  { path: 'toys/new', component: ToyFormComponent },
  { path: 'toys/edit/:id', component: ToyFormComponent },
  { path: 'stocks', component: StockListComponent },
  { path: 'stocks/new', component: StockFormComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'orders/new', component: OrderFormComponent },
  { path: 'orders/edit/:id', component: OrderEditComponent }
  
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient()
  ]
};
