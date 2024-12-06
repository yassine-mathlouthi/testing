import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  firstFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialize the form group using FormBuilder
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstName: ['', Validators.required],                 // First Name
      lastName: ['', Validators.required],                 // Last Name
      phoneNumber: ['', Validators.required],              // Phone Number
      secondCtrl: ['', Validators.required],
      storeName: ['', Validators.required],                // Store Name
      storeAddress: ['', Validators.required],             // Store Address
      storeDescription: ['', Validators.required]          // Store Description
    });
  }

  // Method to handle Create Store button click
  createStore() {
    if (this.firstFormGroup.valid) {
      console.log('Form Submitted:', this.firstFormGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
