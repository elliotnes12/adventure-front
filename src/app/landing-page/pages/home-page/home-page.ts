import { Component } from '@angular/core';
import { FacturaPage } from "../../components/factura-page/factura-page";

@Component({
  selector: 'app-home-page',
  imports: [FacturaPage],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
  standalone: true
})
export class HomePage { }
