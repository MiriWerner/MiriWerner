import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, FormGroupDirective, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { takeUntil, of, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() formArrayName!: string;
  @Input() refresh!: boolean;
  formArray!: FormArray;
  form!: FormGroup;
  newContact!: FormGroup;
  constructor(private data: DataService, private changeRef: ChangeDetectorRef, private fb: FormBuilder, private processForm: FormGroupDirective) { }
  contacts = this.data.contacts;
  change = false;
  Value: any = "";
  Code: any = 0;
  refreshContacts() {
    if (this.refresh) {
      this.formArray.clear();
      this.refresh = false;
    }
  }
  putValue() {  
    this.submitedBy.forEach(sub => {
      if (sub.value === this.Value)
        this.Code = sub.code;
    })
    console.log(this.newContact.value);
  }
  add() {
    if (this.newContact.get('phoneNumber')?.value !== null) {
      let phone = this.newContact.get('phoneNumber')?.value.slice(0, 3);
      let phone1 = this.newContact.get('phoneNumber')?.value.slice(-7);

      this.newContact.get('phoneNumber')?.patchValue(phone + phone1);
    }
    let flag = false;
    let flag1 = this.newContact.get('deliveryFlag')?.value === null
    if (this.newContact.valid) {
      if (this.formArray.controls.length === 0) {
        if (flag1) {
          alert("חייב להיות לפחות איש קשר מועדף אחד!");
        }
        else {
          flag = true;
        }
      }
      else {
        flag = true;
      }

      if (flag) {
        this.formArray.push(this.fb.group({
          id: this.newContact.controls['id'].value,
          deliveryFlag: this.newContact.controls['deliveryFlag'].value,
          type: this.fb.group({
            code: this.fb.control(this.Code),
            value: this.fb.control(this.Value),
          }),
          name: this.newContact.controls['name'].value,
          phoneNumber: this.newContact.controls['phoneNumber'].value,
          email: this.newContact.controls['email'].value,
          address: this.newContact.controls['address'].value
        })
        )
        this.newContact.reset();
        this.addContact = false;
        this.change = true;
        console.log(this.form.value);
      }
    }

    else {
      alert('required');
    }
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ngOnInit(): void {
    this.added = false;
    this.form = this.processForm.control;
    this.formArray = this.form.get(this.formArrayName) as FormArray;
    this.newContact = this.fb.group({
      id: this.fb.control(""),
      deliveryFlag: this.fb.control,
      type: this.fb.group({
        code: this.fb.control(0),
        value: ['', Validators.required],
      }),
      name: ['', [Validators.required, Validators.pattern("^[א-ת\s]+$")]],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.email],
      address: this.fb.control("")
    });
    this.newContact.get('deliveryFlag')?.setValue(false);
    this.newContact.reset();
  }
  print() {
  }
  addContact = false;
  adding() {
    this.addContact = true;
  }

  added: boolean = false;
  informationForm = new FormGroup({});
  claimCause = this.data.claimCause;
  identityTypes = this.data.identityTypes;
  injuryType = this.data.injuryType;
  submitedBy = this.data.submitedBy;
  submitionMethod = this.data.submitionMethod;
  superClaimType = this.data.superClaimType;

}
