import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  service = inject(SharedService);
  fb = inject(FormBuilder);
  router = inject(Router)

  
  ngOnInit(): void {
    localStorage.setItem('token','');
    this.loginForm = this.fb.group({
      emailId:[''],
      password:[''],
    })
  }

  loginUserData(){
    this.service.loginUserData(this.loginForm.value).subscribe((res:any)=>{
      // console.log(res.data[0]._id)
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId', res.data[0]._id);
      this.loginForm.reset();
      this.router.navigate(['/notes'])
    },err=>{
      console.log("Something Went Worong...")
    })
  }

}
