import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { of } from 'rxjs';


@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  files: File[] = [];
  showPackages:boolean=true;

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      // toolbarExtraButtons: [
      //   { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      // ],
    }
  };

  public Editor = ClassicEditor;

  constructor(private ngWizardService: NgWizardService) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false

  ngOnInit(): void {
  }

  select_package=(type)=>{
    this.showPackages=false;
  }
  hide_payment_form=()=>{
    this.showPackages=true;
  }

  //dropzone
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }



  // form wizard
  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
 
  isValidTypeBoolean: boolean = true;
 
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }
 
  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }

}
