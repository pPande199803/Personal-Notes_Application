import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  service = inject(SharedService);
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      "emailId":[''],
      "userName":[''],
      "password":['']
    })
    
  }

  registerNotesData(){
    this.service.registerUserData(this.registerForm.value).subscribe((res:any)=>{
      this.router.navigate(['']);
      this.registerForm.reset();
    },err=>{
      console.log("Something Went Worong")
    })
  }

}
