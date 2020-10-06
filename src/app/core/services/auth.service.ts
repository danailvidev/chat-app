import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = 'https://us-central1-chat-app-b716e.cloudfunctions.net/createUser';

  constructor(private http: HttpClient) {}

  createUser(user) {
    if (user) {
      return this.http.post(this.endpoint, user);
    }
  }
}
