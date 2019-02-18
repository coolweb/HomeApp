import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonsService } from '../persons/persons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  personForm: FormGroup;

  constructor(private personService: PersonsService, private router: Router) {
    this.personForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  ngOnInit() {
  }

  createPerson() {
    this.personService.createPerson(
      this.personForm.value['firstName'],
      this.personForm.value['lastName'])
      .subscribe((p) => {
        console.log(`Person created with id ${p.id}`);

        this.router.navigate(['settings']);
      });
  }
}
