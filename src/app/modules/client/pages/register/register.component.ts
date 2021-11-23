import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

// services
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formSubmitLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {}

  initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.status == 'INVALID') return;

    this.formSubmitLoading = true;
    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe(
      (response: any) => {
        this.toast.success(response.message, { position: 'top-right' });
        this.formSubmitLoading = false;
      },
      (error) => {
        this.formSubmitLoading = false;
        console.log(error)
        this.toast.error(error.error.message, { position: 'top-right' });
      }
    );
  }
}
