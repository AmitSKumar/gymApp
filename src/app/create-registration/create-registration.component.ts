import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
public packages=["Monthly","Quaterly","Yearly"]
public  implists:string[]=[
  "Toxic Fat reduction"
,"Energy and endurance"
,"Building Lean Muscle" 
,"Super Craving Body"
,"Fitness"]

public registerForm!:FormGroup
constructor(private fb:FormBuilder,private api :ApiService){
  
}
ngOnInit(): void {
  this.registerForm=this.fb.group({
    firstname:[''],
    lastname:[''],
    email:[''],
    mobile:[''],
    height:[''],
    weight:[''],
    bmi:[''],
    bmiresult:[''],
    gender:[''],
    requiretrainer:[''],
    package:[''],
    important:[''],
    havegymbefore:[''],
    enquirydate:[''],
  })
  this.registerForm.controls['height'].valueChanges.pipe(
    //control wait for user to complete typing
    debounceTime(1000))
    .subscribe(res=>{
    this.calculateBmi(res)
  })
}
submit(){
  console.log(this.registerForm.value)
  this.api.postRegistration(this.registerForm.value).subscribe(res=>{
    console.log(res)
  })

}
calculateBmi(height:number,){
  const weight =this.registerForm.value.weight;
  const bmi =weight/(height*height);
  this.registerForm.controls['bmi'].patchValue(bmi);
  switch (true) {
    case bmi<18.5:
      this.registerForm.controls['bmiresult'].patchValue('Underweight')
      break;
    case (bmi>=18.5 && bmi<25):
      this.registerForm.controls['bmiresult'].patchValue('Normalweight')
      break;
      case (bmi>=25 &&bmi<30):
        this.registerForm.controls['bmiresult'].patchValue('Overweight')
        break;
    default:
      this.registerForm.controls['bmiresult'].patchValue('Obese')
  }
}
}
