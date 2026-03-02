import { computed, inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { ProductResponse } from "../interfaces/product.response";

@Injectable({
    providedIn: 'root'
})
export class FacturaService {

  _http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;
  _response = signal<ProductResponse | null>(null);

  
  response = computed(() => this._response());


  generarFactura(formData: FormData): Observable<ProductResponse> {
    return this._http.post<ProductResponse>(`${this.baseUrl}/factura/create`, formData)
      .pipe(
        tap((resp) => {
          this._response.set(resp);
        }),
        catchError((error: any) => {
          return throwError(() => error);
        }),
      );
  }
}