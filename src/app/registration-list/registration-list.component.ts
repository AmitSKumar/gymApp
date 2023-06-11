import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../service/api.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {
  public users!:User[];
  displayedColumns: string[] = [  
  'firstname',
  'lastname',
  'email',
  'mobile',
  'bmiresult',
  'gender',
  'package',
  'enquirydate',
  'action'
];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private api :ApiService,private router:Router){

  }
  ngOnInit(): void {
    this.getAllData()
  }
  getAllData(){
    this.api.getRegistredUser().subscribe(res=>{
     this.users=res
     this.dataSource=new MatTableDataSource(this.users)
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.sort
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(id:number){
    this.router.navigate(['update',id])
  }
  delete(id:number){
    this.api.DeleteRegistredUser(id).subscribe(res=>{
      alert('deleted')
      this.getAllData()
    })
}

}