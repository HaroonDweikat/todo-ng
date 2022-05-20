import {throwError} from "rxjs";

export class User {

  constructor(
    public id: string,
    public email: string,
    private _idToken: string,
    private _tokenExpireDate: Date,
  ) {}

  get token(){
    return this._tokenExpireDate;
  }

}
