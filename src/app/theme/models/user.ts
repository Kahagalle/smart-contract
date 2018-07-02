/**
 * User
 */

 import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

export class User {
	public user_id : string;
    public username : string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public city: string;
    public country: string;
    public postalcode :string;
    public about: string;
}
