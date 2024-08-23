import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { ApiService } from './api.service';
import {FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  apiDatas: any[] = [];
  myForm!: FormGroup;
  submitted = false;
  currentIndex: number | null = null; 


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
  
    this.loadDataFromLocalStorage();
    this.myForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ]],
      first_name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      avatar: ['', Validators.required],
      created_date: ['', Validators.required] // New date input
    });
  }

  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('Users');
    if (storedData) {
      this.apiDatas = JSON.parse(storedData);
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem('Users', JSON.stringify(this.apiDatas));
  }

  get f() { return this.myForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }

    if (this.currentIndex !== null) {
      // Update existing record
      this.apiDatas[this.currentIndex] = this.myForm.value;
    } else {
      // Add new record
      this.apiDatas.push(this.myForm.value);
    }

    // this.apiDatas.push(this.myForm.value);
    this.saveDataToLocalStorage();
    this.myForm.reset();
    this.submitted = false;
    this.currentIndex = null;
  }
 
  deleteRow(index: number): void {
    // Remove item from the array
    this.apiDatas.splice(index, 1);
    // Update localStorage
    this.saveDataToLocalStorage();
  }


  editRow(index: number) {
    this.currentIndex = index; // Set the index of the row to be edited
    const row = this.apiDatas[index];
    this.myForm.setValue({
      id: row.id,
      email: row.email,
      first_name: row.first_name,
      last_name: row.last_name,
      avatar: row.avatar,
      created_date: row.created_date
    });
  }
  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
    this.currentIndex = null;
  }
}


// export class AppComponent implements OnInit {
//   apiDatas: any[] = [];
//   myForm!: FormGroup; 
//   submitted = false;
//   constructor(public apiService: ApiService,private formBuilder: FormBuilder) {}
  
//   ngOnInit(): void {
//     this.getAllData();
//     this.myForm = this.formBuilder.group(
//       {
//         id: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         first_name: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(6),
//             Validators.maxLength(20),
//           ],
//         ],
//         last_name: [
//           '',
//           [
//             Validators.required,
//             Validators.minLength(6),
//             Validators.maxLength(20),
//           ],
//         ],
//         avatar: ['', Validators.required],
//       }
//     ) 
//   }
  
//   getAllData() {
//     this.apiService.getData().subscribe({
//       next: (data: any) => {
//         this.apiDatas = data.data;
//         console.log(data.data);
//       },
//       error: () => {
//         console.log('err');
//       },
//       complete: () => {
//         console.log('all are completed');
//       },
//     });
//   }

//   get f() { return this.myForm.controls; }
//   onSubmit() {
//     this.submitted = true;
//     if (this.myForm.invalid) {
//       return;
//     }
  
//     this.apiService.postData(this.myForm.value).subscribe({
//       next: (data) => {
//         console.log(data);
//         this.apiDatas.push(data);
//         localStorage.setItem('Users',JSON.stringify(data));
//         this.myForm.reset();
//       },
//       error: () => {
//         console.log('err');
//       },
//       complete: () => {
//         console.log('all are completed');
//       },
//     });
//     console.log(this.myForm.value);
//   }

//   onReset(): void {
//     this.submitted = false;
//     this.myForm.reset();
//   }
// }
