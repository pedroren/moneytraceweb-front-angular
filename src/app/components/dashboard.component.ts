import { Component } from '@angular/core';
import { globalModules } from '../global-modules'; 

@Component({
  selector: 'app-dashboard',
  imports: [...globalModules],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
