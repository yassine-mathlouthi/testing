import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts'; // Import NgChartsModule
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { HeaderComponent } from '../../../layout/components/header/header.component';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[MatTable, MatFormField,MatLabel,MatSelect,MatOption,CommonModule, MatTableModule, MatSortModule,HeaderComponent,BaseChartDirective,MatButtonModule,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private _productService: ProductService) {}

  data: any;
  verif = 0;

  // Chart properties
  chartLabels: string[] = [];
  chartData: any[] = [];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit(): void {
    this._productService.getList().subscribe(
      (response) => {
        console.log('API Response:', response);

        this.data = response; // Assume response is an array of commands
        this.verif = 200; // Success

        // Process data for the chart
        this.updateChart(this.data);
      },
      (err) => {
        console.error('API Error:', err);
        this.verif = err.status;
        this.data = []; // Set data to empty if there's an error
      }
    );
  }

  updateChart(data: any[]): void {
    // Extract labels and data dynamically
    this.chartLabels = data.map((command) => `Commande ${command.idCommande}`);
    this.chartData = [
      {
        data: data.map((command) => command.prixTotalCommande),
        label: 'Total Price',
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
      },
    ];
  }
}
