import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray ,FormBuilder, Validators} from '@angular/forms';
import { DataService } from '../data.service';
import { IProcess } from '../iprocess';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  constructor(private data: DataService, public changeRef: ChangeDetectorRef,private fb: FormBuilder) { }
  claimCause = this.data.claimCause;
  identityTypes = this.data.identityTypes;
  injuryType = this.data.injuryType;
  submitedBy = this.data.submitedBy;
  submitionMethod = this.data.submitionMethod;
  superClaimType = this.data.superClaimType;
  refresh=false;
  proceed() {
    console.log(this.processForm.value);
  }
  refreshProcess() {
    this.processForm.reset();
    this.refresh=true;
  }

  validateForm() {
   return this.processForm.valid
  }
  processForm!: FormGroup;
  contactPersons!: FormArray;
  
  ngOnInit(): void {
    this.processForm = this.fb.group({
      superClaim: this.fb.group({
        superClaimNum:this.fb.control('1'),
        superClaimStatus: this.fb.group({
          code: this.fb.control(0),
          value: this.fb.control("פתוחה")
        }),
      }),
      insured: this.fb.group({
        address: this.fb.group({
          cityName: this.fb.control(""),
          streetName: this.fb.control("")
        }),
        identityType: this.fb.control(""),
        age: this.fb.control(""),
        lastName:  ['',Validators.required],
        identity: this.fb.control(""),
        firstName:  ['',Validators.required]
      }),
      contactPersons:this.fb.array([])
    });
  }

}

