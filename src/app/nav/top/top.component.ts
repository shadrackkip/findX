import { AppStateService } from './../../services/app-state.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit,AfterViewInit {

  @ViewChild('closeModal') modalBtn:ElementRef
  constructor(
    private appService:AppStateService
  ) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void{
    this.appService.getModalStatus().subscribe((data:any)=>{
      if(data.close){
        let ele = this.modalBtn.nativeElement
        ele.click()
      }
     
      
    })
  }

}
