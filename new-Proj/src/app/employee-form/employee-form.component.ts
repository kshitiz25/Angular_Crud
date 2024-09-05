import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {};
  isEditMode: boolean = false;
  id: number | null = null;

  constructor(
    public employeeService: EmployeeService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.id = id;
        this.isEditMode = true;
        this.employeeService.getEmployee(id).subscribe(data => {
          this.employee = data;
        });
      }
    });
  }

  save(): void {
    if (this.isEditMode && this.id !== null) {
      this.employeeService.updateEmployee(this.id, this.employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}

