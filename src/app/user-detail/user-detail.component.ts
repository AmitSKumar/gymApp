import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public userIdtoget!:number
  public userDetails!:User
constructor(private activatedroute:ActivatedRoute,private api :ApiService){

}
ngOnInit(): void {
  this.activatedroute.params.subscribe(value=>{
    this.userIdtoget=value['id']
    this.getUserDetailById(this.userIdtoget)
  })
}
getUserDetailById(id:number){
  this.api.getRegistredUserById(id).subscribe(res=>{
    this.userDetails=res
  })
}
}
