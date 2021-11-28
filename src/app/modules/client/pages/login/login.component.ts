import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

// services
import { AuthService } from '../../shared/services/auth.service';
import { SupabaseService } from '../../shared/services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService,
    private supabaseService: SupabaseService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    console.log(this.supabaseService.getUser);
  }

  signInWithGoogle = async () => {
    this.supabaseService.signIn();
    
    // this.supabaseService.signOut()
  };

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.status == 'INVALID') return;

    this.formSubmitLoading = true;
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this.toast.success('Logged In!', { position: 'top-right' });

        this.authService.setSession(response);
        this.router.navigate(['/profile']);
        this.formSubmitLoading = false;
      },
      (error) => {
        this.formSubmitLoading = false;
        console.log(error);

        if (error.status == 0) {
          this.toast.error(error.message, { position: 'top-right' });
        } else {
          this.toast.error(error.error.message, { position: 'top-right' });
        }
      }
    );
  }
}
