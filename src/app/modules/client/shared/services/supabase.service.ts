import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async signIn() {
    return this.supabase.auth.signIn(
      {
        provider: 'google',
      },
      {
        redirectTo: environment.siteURL + '/login',
      }
    );
  }

  get getUser() {
    return this.supabase.auth.user();
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
