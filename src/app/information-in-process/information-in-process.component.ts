import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, Form, FormArray, FormGroup, FormGroupDirective } from '@angular/forms';
import { DataService } from '../data.service';
import { NgModule } from '@angular/core';
import { from } from 'rxjs';


@Component({
  selector: 'app-information-in-process',
  templateUrl: './information-in-process.component.html',
  styleUrls: ['./information-in-process.component.css']
})
export class InformationInProcessComponent implements OnInit {
  @Input() formGroupName!: string;
  informationForm!: FormGroup;
  formArray!: FormArray;
  form!: FormGroup;
  claimNo() {
    if (this.informationForm.get('superClaimStatus')?.get('value')?.value == 'התביעה אושרה') {
      this.informationForm.get('superClaimStatus')?.get('code')?.patchValue(1);
    }
    else if (this.informationForm.get('superClaimStatus')?.get('value')?.value == 'התביעה נדחתה') {
      this.informationForm.get('superClaimStatus')?.get('code')?.patchValue(2);
    }
    else if (this.informationForm.get('superClaimStatus')?.get('value')?.value == 'טרם התקבלה החלטה') {
      this.informationForm.get('superClaimStatus')?.get('code')?.patchValue(4);
    }
    this.form.get('superClaim')?.get('superClaimStatus')?.setValue(this.informationForm.get('superClaimStatus')?.get('value')?.value);
    this.changeRef.markForCheck();
  }

 
  isExists(event:any) {
    this.subBy=event;
    this.formArray = this.processFormGroup.control.get('contactPersons') as FormArray;
    let x=0;
    const number$ = from(this.formArray.controls);
    number$.subscribe(exist=>{
      if(exist.get('type')?.get('value')?.value === this.subBy) {
        x++;
      }
    });


    if (x===0) {
      alert("חייב להיות איש קשר מאותו הסוג!")
    }

  }
  
  public enable: boolean = false;
  toEnable() {
    this.enable = true;
  }



  constructor(private processFormGroup: FormGroupDirective, private data: DataService, public changeRef: ChangeDetectorRef) { }
  claimCause = this.data.claimCause;
  identityTypes = this.data.identityTypes;
  injuryType = this.data.injuryType;
  submitedBy = this.data.submitedBy;
  submitionMethod = this.data.submitionMethod;
  superClaimType = this.data.superClaimType;
  subBy:any;

  ngOnInit(): void {
    this.form = this.processFormGroup.control;
    this.informationForm = this.processFormGroup.control.get(this.formGroupName) as FormGroup
  }
  ngOnChanges() {
    console.log(this.informationForm);
  }


}
