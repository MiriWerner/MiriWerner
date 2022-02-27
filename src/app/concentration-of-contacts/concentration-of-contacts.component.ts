import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { DataService } from '../data.service';
import { from} from 'rxjs';

@Component({
  selector: 'app-concentration-of-contacts',
  templateUrl: './concentration-of-contacts.component.html',
  styleUrls: ['./concentration-of-contacts.component.css']
})
export class ConcentrationOfContactsComponent implements OnInit {
  @Input() formGroupName !: string;
  @Input() changed!: boolean;
  formGroup !: FormGroup;;
  formArray!: FormArray;
  form!: FormGroup;
  constructor(private fb: FormBuilder, private processForm: FormGroupDirective, public changeRef: ChangeDetectorRef, private data: DataService) { }
  change() {
    if (this.changed) {
      this.form = this.processForm.control;
      this.formGroup = this.processForm.control.get(this.formGroupName) as FormGroup
      this.formArray = this.processForm.control.get('contactPersons') as FormArray;
      this.noContacts = this.formArray.controls.length;
      this.changeRef.markForCheck();
      return true;
    }
    else {
      return true;
    }
  }
  addInsured() {
    if (this.formGroup.valid) {
      this.formArray.push(
        this.fb.group({
          id: this.formGroup.controls['identity'].value,
          deliveryFlag: true,
          type: this.fb.group({
            code: this.fb.control(3),
            value: this.fb.control('מבוטח')
          }),
          name: this.formGroup.controls['firstName']?.value + ' ' + this.formGroup.controls['lastName']?.value,
          phoneNumber: "0504158422",
          email: '',
          address: this.formGroup.controls['address'].get('streetName')?.value + ' ,' + this.formGroup.controls['address'].get('cityName')?.value
        })
      )
      this.formGroup.reset();
    }


  }
  noContacts = 0;


  ngOnInit(): void {
    this.form = this.processForm.control;
    this.formGroup = this.processForm.control.get(this.formGroupName) as FormGroup
    this.formArray = this.processForm.control.get('contactPersons') as FormArray;
  }

  ngOnChanges() {
    console.log(this.formGroup);
  }
  deleteNotDelivery() {
    let x = 0;
    const number$ = from(this.formArray.controls); 
    number$.subscribe(element=>{
      if(element.get('deliveryFlag')?.value !== true) {
          this.formArray.removeAt(x);
      }
      x++;
    });
  }
  deleteAll() {
    this.formArray.clear();
  }

}
