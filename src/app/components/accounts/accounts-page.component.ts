import { Component } from '@angular/core';
import { AccountsListComponent } from "./accounts-list.component";

@Component({
  selector: 'app-accounts-page',
  imports: [AccountsListComponent],
  templateUrl: './accounts-page.component.html',
  styleUrl: './accounts-page.component.css'
})
export class AccountsPageComponent {

}
