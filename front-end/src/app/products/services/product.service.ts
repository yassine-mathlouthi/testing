import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:8955';

  constructor(private httpClient: HttpClient) { }
  getList(){
    const userId = sessionStorage.getItem('userId'); // Retrieve the user's ID
    return this.httpClient.get(this.apiUrl+"/Commandes/getCommandeByIDArtisan/"+userId); 
  }
  addProduct(body:any){
    const userId = sessionStorage.getItem('userId'); // Retrieve the user's ID
    
    return this.httpClient.post(this.apiUrl+"/produits/artisan/addProduct",body); 
  }
  getProductByUSer() {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');  // Retrieve the user's role
    const userId = sessionStorage.getItem('userId'); // Retrieve the user's ID
    return this.httpClient.post(`${this.apiUrl}/produits/artisan/getProduitsByArtisanActif`,Number(userId) );
  }
  getStoreById(){
    const userId = sessionStorage.getItem('userId'); // Retrieve the user's ID
    return this.httpClient.post(`${this.apiUrl}/produits/artisan/getBoutiqueByUserId`,Number(userId) );
  }
  
  deleteProductById(id:number){
    const userId = sessionStorage.getItem('userId'); // Retrieve the user's ID
    return this.httpClient.delete(`${this.apiUrl}/produits/artisan/deleteProduit/`+id.toString());
  }
  /* getAllProducts() {
    return [
      { id: 1, name: 'Sunset Painting', price: 150, imageUrl: 'assets/prod.png', description: 'A beautiful sunset painting with vibrant colors.' },
      { id: 2, name: 'Modern Sculpture', price: 300, imageUrl: 'assets/prod.png', description: 'A sleek and modern sculpture that captures the essence of abstraction.' },
      { id: 3, name: 'Nature Photography', price: 120, imageUrl: 'assets/prod.png', description: 'A serene photograph showcasing the beauty of nature.' },
      { id: 4, name: 'Abstract Art', price: 200, imageUrl: 'assets/prod.png', description: 'A striking abstract art piece that will add depth to any space.' },
      { id: 5, name: 'Cityscape Painting', price: 250, imageUrl: 'assets/prod.png', description: 'A detailed painting of a bustling city skyline.' },
      { id: 6, name: 'Minimalist Poster', price: 80, imageUrl: 'assets/prod.png', description: 'A modern minimalist poster with clean lines and soothing colors.' },
      { id: 7, name: 'Fantasy Illustration', price: 180, imageUrl: 'assets/prod.png', description: 'An enchanting illustration that brings fantasy to life.' },
      { id: 8, name: 'Vintage Portrait', price: 400, imageUrl: 'assets/prod.png', description: 'A timeless vintage portrait that captures the essence of an era.' },
      { id: 9, name: 'Geometric Design', price: 130, imageUrl: 'assets/prod.png', description: 'A sharp geometric design that adds elegance and sophistication.' },
    ];
  } */

  /* getProducts(page: number = 1, pageSize: number = 4) {
    const allProducts = this.getAllProducts();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      products: allProducts.slice(start, end),
      total: allProducts.length
    };
  } */

  // Replace with your actual API URL

  

  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl+"/produits/public/products").pipe(
      map(products =>
        products.map(product => ({
          id: product.idProduit,
          name: product.nomProduit,
          price: product.prix,
          imageUrl: `assets/prod.png`, // Adjust if images are served from the backend
          description: product.descriptionProduit,
          stock: product.quantiteEnStock, // Useful for showing stock availability
          store: {
            name: product.boutique.nomBoutique,
            description: product.boutique.description
          },
          artistName: `${product.boutique.artisan.prenomArtisan} ${product.boutique.artisan.nomArtisan}`
        }))
      )
    );
  }

  getProducts(page: number = 1, pageSize: number = 6): Observable<{ products: any[]; total: number }> {
    return this.getAllProducts().pipe(
      map(allProducts => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return {
          products: allProducts.slice(start, end),
          total: allProducts.length
        };
      })
    );
  }
  

}
