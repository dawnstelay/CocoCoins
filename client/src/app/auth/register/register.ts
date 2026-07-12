import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../service/auth-service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb:FormBuilder, private authService:AuthService) {
    this.registerForm=this.fb.group({
      name:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(){
    ///if(!this.registerForm.invalid){
      console.log(this.registerForm.value);

      this.authService.register(this.registerForm.value).subscribe({
        next:(data)=>{
          console.log(data);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    ///}
  }
}
