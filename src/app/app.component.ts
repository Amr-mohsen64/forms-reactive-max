import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { promise } from "protractor";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signupForm: FormGroup;
  forbiddenUserNames = ["amr", "kareem"];

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });

    //react to any changes in form inputs
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));

    //get the status validiy of form
    this.signupForm.statusChanges.subscribe((status) => console.log(status));

    //set form data

    this.signupForm.setValue({
      userData: {
        username: "max",
        email: "max@gmail.com",
      },
      gender: "male",
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: {
        username: "amoooora",
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }

  // return {key:boolean} , [s:string] means that key as string

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // !==-1 we find it in array
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  // async validator function
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "amrmohsen72@gmail.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
    return promise;
  }
}
