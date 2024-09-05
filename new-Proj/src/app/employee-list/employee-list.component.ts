import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [CommonModule] ,
  standalone: true,
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  editEmployee(id: number): void {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(employee => employee.id !== id);
    });
  }
}

