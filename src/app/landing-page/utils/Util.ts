

export class Util{
    static LabelByCampo(campo:string):string{
        const labels = new Array<{campo:string,label:string}>(
            {campo:'yourCompany', label:'El campo empresa es obligatorio'},
            {campo:'firstNameCompany', label:'El campo nombre es obligatorio'},
            {campo:'lastNameCompany', label:'El campo apellido es obligatorio'},
            {campo:'websiteCompany', label:'El campo sitio web es obligatorio'},
            {campo:'addressCompany', label:'El campo dirección es obligatorio'},
            {campo:'cityCompany', label:'El campo ciudad es obligatorio'},
            {campo:'countryCompany', label:'El campo país es obligatorio'},
            {campo:'phoneCompany', label:'El campo teléfono es obligatorio'},
            {campo:'emailCompany', label:'El campo email es invalido'},
            {campo:'firstNameClient', label:'El nombre del cliente es obligatorio'},
            {campo:'lastNameClient', label:'El apellido del cliente es obligatorio'},
            {campo:'addressClient', label:'La dirección del cliente es obligatoria'},
            {campo:'cityClient', label:'La ciudad del cliente es obligatoria'},
            {campo:'countryClient', label:'El país del cliente es obligatorio'},
            {campo:'emailClient', label:'El email del cliente es invalido'},
            {campo:'companyClient', label:'La empresa del cliente es obligatoria'},
            {campo:'invoceNumber', label:'El número de factura es invalido'},
            {campo:'invoiceDate', label:'La fecha de factura es obligatoria'},
            {campo:'dueDate', label:'La fecha de vencimiento es obligatoria'},
            {campo:'fileImage', label:'El logo es obligatorio'}
        );  
        return labels.find(l => l.campo === campo)?.label || campo;
    }

    static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}