import { Component, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-factura-page',
  imports: [CurrencyPipe],
  templateUrl: './factura-page.html',
  styleUrls: ['./factura-page.css'],
  standalone: true,
})
export class FacturaPage {
  products = signal<Product[]>([]);
  today: string = this.formatDate(new Date());

  total = signal(0);
  subtotal = signal(0);
  discount = signal(0);
  tax = signal(0);



  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  addProduct() {
    console.log('Adding product');
    const newProduct: Product = {
      id: this.products()[this.products().length - 1]?.id + 1 || 1, 
      description: '',
      quantity: 0,
      price: 0,
    };
    this.products.update((products) => [...products, newProduct]);
  }

  updateElement(id: number, field: keyof Product, value: string) {
    console.log('Updating product with ID:', id, 'field:', field, 'with value:', value);
    this.products.update((products) =>
      products.map((p, i) => (i === id ? { ...p, [field]: field === 'id' ? Number(value) : value } : p)),
    );
  }

  removeProduct(id: number) {
    console.log('Removing product with ID:', id);
    this.products.update((products) => products.filter((_, i) => i !== id));
  }
}
