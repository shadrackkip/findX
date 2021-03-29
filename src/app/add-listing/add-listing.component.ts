import { ListingService } from './../services/listing.service';
import { AppStateService } from './../services/app-state.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
} from 'ng-wizard';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { of } from 'rxjs';
import { Listing } from '../models/listing.model';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css'],
})
export class AddListingComponent implements OnInit, AfterViewInit {
  files: File[] = [];
  showPackages: boolean = true;
  isSearchingPlaces: boolean = false;
  submitted: boolean = false;
  goToSection:boolean =false;
  isSaving:boolean=false;
  section:number=1;
  prod_name:string;
  bizAddress = {
    name: '',
    url: '',
    lat: 0,
    lng: 0,
    photos: '',
  };

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      showNextButton:false,
      showPreviousButton:false
      // toolbarExtraButtons: [
      //   { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!"); } }
      // ],
    },
  };

  public Editor = ClassicEditor;

  constructor(
    private ngWizardService: NgWizardService,
    private fb: FormBuilder,
    private listingService: ListingService,
    private appService: AppStateService
  ) {}

  listingForm = this.fb.group({
    title: ['', Validators.required],
    category_id: ['', Validators.required],
    tags: [''],
    description: [''],
    location: [''],
    address: ['', Validators.required],
    zip: ['', Validators.required],
    price: ['', Validators.required],
    names:['',Validators.required],
    phone_number:['',Validators.required],
    email:['',[Validators.required,Validators.email]]
  });

  isEditable = false;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  public handleAddressChange(address: Address) {
    this.bizAddress.name = address.name;
    this.bizAddress.lat = address.geometry.location.lat();
    this.bizAddress.lng = address.geometry.location.lng();
    this.bizAddress.url = address.url;
    this.bizAddress.photos = JSON.stringify(address.photos);
    this.isSearchingPlaces = false;
    this.listingForm.value.location = JSON.stringify(this.bizAddress);
    this.listingForm.patchValue({
      location: JSON.stringify(this.bizAddress),
    });
  }
  onCheckChange = (ev) => {
    if (ev.target.checked) {
      this.listingForm.value.negotiable = 1;
    } else {
      this.listingForm.value.negotiable = 0;
    }
  };

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let el: HTMLElement = document.querySelector('#location');
    el.onkeypress = this.showTyping;
  }
  showTyping = ($event) => {
    this.isSearchingPlaces = true;
  };
  validateForm = () => {
    this.submitted = false;
  };

  select_package = (type) => {
    this.showPackages = false;
  };
  hide_payment_form = () => {
    this.showPackages = true;
  };

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
  canExit(event?: Event) {
    console.log(event);
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    this.submitted = false;
    this.goToSection=false;
    // console.log(args.step);
  }

  //isValidTypeBoolean: boolean = true;p
  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    console.log(args);

    if (this.listingForm.valid && args.fromStep.title==='Ad Details') {
      let notifyData = {
        show: true,
        statusClass: 'info',
        message: 'Saving...🙂',
      };
      this.appService.appStatusNotification(notifyData);
      this.step1().subscribe((resp:Listing) => {
        console.log(resp);

        let notifyData = {
          show: true,
          statusClass: 'success',
          message:`${resp.message} ✔`,
        };
        localStorage.setItem('product_draft',JSON.stringify(resp.data))
        this.prod_name=resp.data.title
        this.appService.appStatusNotification(notifyData);
        this.isSaving=false;
      });

      return true;
    }

    if(args.fromStep.title==='Photos' && this.files.length>0){

      this.step2().subscribe((resp)=>{
        console.log(resp);
        let notifyData = {
          show: true,
          statusClass: 'success',
          message: 'Images uploaded ✔',
        };
        this.appService.appStatusNotification(notifyData);
        this.isSaving=false;
        return true
      })

    }
    //store step2 data
  }
  step1 = () => {
      this.isSaving=true;
      this.section=this.section+1;
    return this.listingService.addListing(this.listingForm.value);

  };
  step2 = () =>{
    this.isSaving=true;
    let formData = new FormData;
    this.files.forEach((file)=>{
      console.log(file);

      formData.append('images[]',file)
    })
    formData.append('product',localStorage.getItem('product_draft'))
    let notifyData = {
      show: true,
      statusClass: 'info',
      message: 'Images are being uploaded please wait...🙂',
    };
    this.appService.appStatusNotification(notifyData);
    return this.listingService.addPhotos(formData)
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}
