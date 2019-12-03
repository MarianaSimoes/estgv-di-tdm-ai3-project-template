import * as queryString from 'query-string';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IUserService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class UserApiService implements IUserService {

  /**
   * Constructor
   * @param httpClient HTTP Client
   */
  constructor(
    private httpClient: HttpClient,
  ) {

  }

  /** @inheritdoc */
  getUserById(
    userId: number,
  ): Observable<Api.IUser> {
    const getUserUrl = this.buildApiUrl({ path: userId.toString() });
    return this.httpClient.get<Api.IUser>(getUserUrl);
  }

  /** @inheritdoc */
  listUsers(
    filter?: Api.IUserFilter
  ): Observable<Api.IUser[]> {
    const listUsersUrl = this.buildApiUrl({ queryParams: filter});
    return this.httpClient.get<Api.IUser[]>(
      listUsersUrl, {
        headers: {
          "Authorization": 'Bearer ${token}'
        }
      });
  }

  /** @inheritdoc */
  createUser(
    data: Api.IUserCreateData
  ): Observable<Api.IUser> {
    const createUserUrl = this.buildApiUrl();
    return this.httpClient.post<Api.IUser>(createUserUrl, data);
  }

  /** @inheritdoc */
  updateUserById(
    userId: number,
    data: any
  ): Observable<Api.IUser> {
    const updateUserUrl = this.buildApiUrl({ path: userId.toString() });
    return this.httpClient.put<Api.IUser>(updateUserUrl, data);
  }

  /** @inheritdoc */
  deleteUserById(userId: number): Observable<any> {
    const deleteUserUrl = this.buildApiUrl({ path: userId.toString() });
    return this.httpClient.delete<void>(deleteUserUrl);
  }

  /**
   * Build API resource URL
   * @param config URL configuration
   */
  private buildApiUrl(config?: { path?: string, queryParams?: any}) {
    let finalResourceUrl = `${environment.apiBaseUrl}/users`;
    if (config && config.path) {
      finalResourceUrl = `${finalResourceUrl}/${config.path}`;
    }
    return config && config.queryParams
      ? `${finalResourceUrl}?${queryString.stringify(config.queryParams)}`
      : finalResourceUrl;
  }
}
