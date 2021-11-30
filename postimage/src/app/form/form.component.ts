import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../service/api.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  employeeData: any;
  imageSrc: string = '';
  array: any;
  dataList: any;
  formValue!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder) {
    // this.dataList = [
    //   { code: 1 },
    //   { code: 2 },
    //   { code: 3 },
    //   { code: 4 },
    //   { code: 5 },
    //   { code: 6 },
    //   { code: 7 },
    //   { code: 8 },
    //   { code: 9 },
    //   { code: 10 }
    // ]


  }


  registerForm: any;


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      items: new FormArray([]),


      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'email': new FormControl(''),
      'mobile': new FormControl(''),
      'salary': new FormControl(''),
      'technology': new FormControl(''),
      'rating': new FormControl(''),
      'image': new FormControl()

    });
    this.getAllEmployee();


  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log('--------------------------------', this.imageSrc)
  }


  onSubmit() {
    console.log('hjjh', this.registerForm.value);
  }
  onpost() {
    let payLoad = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      mobileNumber: this.registerForm.value.mobile,
      salary: this.registerForm.value.salary,
      image: this.imageSrc,
      // technology:this.registerForm.value.technology,
      technology: this.registerForm.value.items,
      // rating: this.registerForm.value.items
      // rating:this.registerForm.value.items

    }
    this.api.clickthis(payLoad).subscribe((res: any) => {

    });
  }

  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;

      })
  }

  delteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee deleted")
        this.getAllEmployee();
      })
  }

  createItem(): FormGroup {
    return this.fb.group({
      technology: '',
      rating: ''
      // technology:new FormControl('')
    });
  }
  arrayClick(): void {
    this.array = this.registerForm.get('items') as FormArray;
    this.array.push(this.createItem());

  }


  onEdit(row: any) {
    console.log('----', row)
    console.log('cxsx', this.registerForm);
    this.registerForm.controls['firstName'].setValue(row.firstName);
    this.registerForm.controls['lastName'].setValue(row.lastName)
    this.registerForm.controls['email'].setValue(row.email)
    this.registerForm.controls['mobile'].setValue(row.mobileNumber)
    this.registerForm.controls['salary'].setValue(row.salary)
    row.technology.forEach((e: any, index: any) => {
      console.log('index', index)
      this.registerForm.controls['technology'].setValue(row.technology[index].technology)
      // this.formArray.controls['rating'].setValue(emp.arr[index].rating)
    });



  }
  ratingList: any = [
    { code: 'select' },
    { code: 1 },
    { code: 2 },
    { code: 3 },
    { code: 4 },
    { code: 5 }
  ]



}
