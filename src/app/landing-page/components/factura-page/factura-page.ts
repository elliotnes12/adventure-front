import { Component, inject, signal, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { AppLogo } from "../app-logo/app-logo";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Util } from '../../utils/Util';
import { FacturaService } from '../../services/factura.service';
import { ProductResponse } from '../../interfaces/product.response';
import { Loading } from "../loading/loading";


@Component({
  selector: 'app-factura-page',
  imports: [CurrencyPipe, AppLogo, ReactiveFormsModule, NgStyle, Loading],
  templateUrl: './factura-page.html',
  styleUrls: ['./factura-page.css'],
  standalone: true,
})
export class FacturaPage implements OnInit {
  products = signal<Product[]>([]);
  today: string = this.formatDate(new Date());
  logoPreview = signal<string | null>(null);
  isEditFactura = signal(false);
  isLoading = signal(false);
  finished = signal(false);
  emptyProducts = signal<boolean>(false);

  total = signal(0);
  subtotal = signal(0);
  discount = signal(0);
  tax = signal(0);

  formBuilder = inject(FormBuilder);
  formGroup!: FormGroup;

  facturaService = inject(FacturaService);


  /** Formulario reactivo */


  ngOnInit() {
    this.formGroup = this.formBuilder.group(
        
        {
         firstNameCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
         yourCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
         lastNameCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
         websiteCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
         addressCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
         cityCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        countryCompany: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        phoneCompany: new FormControl('', { 
          validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
          updateOn: 'blur'
        }),
         emailCompany: new FormControl('', {
         validators: [Validators.required, Validators.email],
         updateOn: 'blur'
        }),
        firstNameClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        lastNameClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        addressClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        cityClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        countryClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
        }),
        emailClient: new FormControl('', {
         validators: [Validators.required, Validators.email],
         updateOn: 'blur'
        }),
        companyClient: new FormControl('', {
         validators: [Validators.required],
         updateOn: 'blur'
         }),
         invoceNumber: new FormControl('', {
          validators: [Validators.required, Validators.pattern(/^\d+$/)],
          updateOn: 'blur'
         }),
         invoiceDate: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'blur'
         }),
         dueDate: new FormControl('', {
          validators: [Validators.required],
          updateOn: 'blur'
         }),
         fileImage: new FormControl(null, {
          validators: [Validators.required],
          updateOn: 'change'
         }),
    });
  }

   get camposFactura() {
     return Object.keys(this.formGroup.controls);
   }


   LabelByCampo(campo:string):string{  
    return Util.LabelByCampo(campo);
  }


  /**
   * agregar producto
   * @return void
   */
  addProduct() {
    console.log('Adding product');
    const newProduct: Product = {
      id: this.products()[this.products().length - 1]?.id + 1 || 1, 
      description: '',
      quantity: 0,
      price: 0,
      type: 'Producto'
    };
    this.products.update((products) => [...products, newProduct]);

  
  }

  /**
   *  actualizar producto
   * @param id 
   * @param field 
   * @param value 
   */
  updateElement(id: number, field: keyof Product, value: string) {
    this.products.update((products) =>
      products.map((producto, i) => (i === id ? { ...producto, [field]: value } : producto)),
    );

    this.subtotal.set(this.products().reduce((acc, producto) => acc + producto.quantity * producto.price, 0));
    
  }

  /**
   * Procesar Factura
   */
  generarFactura(event: any) {
  
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid || this.products().length === 0) {
      this.emptyProducts.set(this.products().length === 0);
      console.log('Formulario inválido');
      return;
    }

    this.isLoading.set(true);
    this.emptyProducts.set(false);

    const formData = new FormData();
      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      formData.append('products', JSON.stringify(this.products()));

      this.facturaService.generarFactura(formData).subscribe({
        next: (response) => this.onFacturaSuccess(response),
        error: (err) => this.onFacturaError(err)
      });

    event.preventDefault(); 
  }

  /**
   * 
   * remover producto y actualizar subtotal
   * @param id 
   * 
   */
  removeProduct(id: number) {
    console.log('Removing product with ID:', id);
    this.products.update((products) => products.filter((_producto, i) => i !== id));
 
    if(this.products().length === 0){
      this.subtotal.set(0);
    } else {
      this.subtotal.set(this.products().reduce((acc, producto) => acc + producto.quantity * producto.price, 0));
    }
    
  }



 formatDate(date: Date): string {
   return Util.formatDate(date);
}

seleccionarLogo(event: any) {
const archivo = event.target.files[0];

  if (archivo) {
    this.formGroup.patchValue({
      fileImage: archivo
    });
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview.set(reader.result as string);
    };
    reader.readAsDataURL(archivo);
  }
 }



 editFactura(event:any) {

  this.isEditFactura.update((value) => !value);
  event.preventDefault();

}

  cleanFactura(event:any) {

  this.formGroup.reset();
  this.products.set([]);
  this.logoPreview.set(null);
  this.isEditFactura.set(false);
  event.preventDefault(); 
}

  private onFacturaSuccess(response: ProductResponse): void {
     if (response) {
      const total = response.total || 0;
      const discount = response.discount || 0;
      const totalTax = response.totalTax || 0;

      this.total.set(total);
      this.discount.set(discount);
      this.tax.set(totalTax);  
      this.isLoading.set(false);
      this.finished.set(true);

            
     } else {
      console.error('Failed to generate factura: No response received');
     }
  }

  private onFacturaError(err: any): void {
    console.error('Error generating invoice:', err);
    this.isLoading.set(false);
    this.finished.set(true);
  }
}
