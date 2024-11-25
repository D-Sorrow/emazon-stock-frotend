import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/IUser';
import { environment } from 'src/environments/environment';
import { user_const } from '../../const/user.const';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(environment.api_url_user + user_const.add_user_url, user);
  }

}
