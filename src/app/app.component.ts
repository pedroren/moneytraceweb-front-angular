import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenubarModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Moneytrace';
  items: MenuItem[] | undefined;

  ngOnInit(){
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Vendors',
        icon: 'pi pi-fw pi-table',
        routerLink: '/vendors'
      },
    ]      
  }
}
