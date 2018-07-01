import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyService } from "../../theme/services/backend/services";
import { Router, Params, ActivatedRoute } from '@angular/router';
declare var require: any;
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [MyService],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  ChainInfo = null;
  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;


  constructor(fb: FormBuilder,private _service: MyService,private _route: ActivatedRoute, private _router: Router) { 
    console.log("user profile");
    _service.getinfo().then(data => {
      console.log(data);
  }).catch(error => {
      console.log(error.message);
  });

  
  _service.getaddresses().then(data => {
    console.log(data);
}).catch(error => {
    console.log("error.message");
});

this.form = fb.group({
  'name': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  'email': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
});
this.name = this.form.controls['name'];
this.email = this.form.controls['email'];
  }

  ngOnInit() {
  }

  public onUserSubmit(values: Object): void {
    console.log("submitted");
    console.log(values);
  }

}
