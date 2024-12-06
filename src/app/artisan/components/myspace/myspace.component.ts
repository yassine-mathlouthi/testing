import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { HeaderComponent } from "../../../layout/components/header/header.component";
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { ProductService } from '../../../products/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-myspace',
    standalone: true,
    templateUrl: './myspace.component.html',
    styleUrl: './myspace.component.css',
    imports: [HeaderComponent,CommonModule,
    FooterComponent]
})
export class MyspaceComponent  implements OnInit {
  products : any 
  store : any 
  ngOnInit(): void {
    this._prodService.getProductByUSer().subscribe(
      (data) => {
        this.products = data
        console.log('Fetched products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    this._prodService.getStoreById().subscribe(
      (data) => {
        this.store = data
        
        console.log('Fetched products:', data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    )
   
  }
  test(){
    
    this._prodService.getProductByUSer().subscribe(
      (data) => {
        
        console.log('Fetched products:', data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  constructor(public dialog: MatDialog,private _prodService : ProductService) {}

  openDialog(): void {
    this.dialog.open(AddProductComponent, {
      width: '550px', // Adjust width as needed
      // You can add other configuration options here
    });
  }
  openDialogEdit(): void {
    this.dialog.open(EditProductComponent, {
      width: '550px', // Adjust width as needed
      // You can add other configuration options here
    });
  }
  open_Dialog_Edit_Profile(): void {
    this.dialog.open(EditProfileComponent, {
      width: '550px', // Adjust width as needed
      // You can add other configuration options here
    });
  }
  deleteProduct(id:any){
    this._prodService.deleteProductById(id).subscribe(
      (r)=>{
        console.log("res",r)
      }
    )

  }
  
}
