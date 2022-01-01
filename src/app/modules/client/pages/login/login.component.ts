import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isProvider: any;
  thruProviderLoginData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService,
    private supabaseService: SupabaseService
  ) {
    this.initializeForm();
  }

  isEmptyObject(obj: any) {
    return !!obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  async ngOnInit() {
    this.route.queryParamMap.subscribe(
      (params: any) => (this.isProvider = params.params)
    );

    if (!this.isEmptyObject(this.isProvider)) {
      setTimeout(() => {
        this.loadUser();
      }, 3000);
    }
  }

  loadUser() {
    const data = this.supabaseService.getUser;

    if (data == null) {
      this.router.navigate(['/']);
    } else {
      this.thruProviderLoginData = {
        id: data?.id,
        name: data?.user_metadata.name,
        email: data?.email,
        image: data?.user_metadata.avatar_url,
        sub: data?.user_metadata.sub,
      };

      const dataLogin: any = {
        email: data?.email,
        password: data?.user_metadata.sub,
      };

      this.sendProviderData(dataLogin);
    }
  }

  sendProviderData(dataLogin: any) {
    this.authService.loginWithGoogle(this.thruProviderLoginData).subscribe(
      (response) => {
        this.supabaseService.signOut();
        this.onSubmit(2, dataLogin);
      },
      (error) => {
        console.log(error);
        this.supabaseService.signOut();
        this.onSubmit(2, dataLogin);
      }
    );
  }

  signInWithGoogle = async () => {
    this.supabaseService.signIn();
  };

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(provider: any, data?: any) {
    if (provider == 1) {
      if (this.loginForm.status == 'INVALID') return;

      this.formSubmitLoading = true;
      this.loginRequest(this.loginForm.value);
    } else {
      this.loginRequest({ email: data.email, password: data.password });
    }
  }

  loginRequest(data: any) {
    this.authService.login(data).subscribe(
      (response: any) => {
        this.toast.success('Logged In!', { position: 'top-right' });

        this.authService.setSession(response);
        this.router.navigate(['/']);
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
