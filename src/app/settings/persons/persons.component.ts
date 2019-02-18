import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonsService } from './persons.service';
import { Person } from 'src/app/shared/model/Person';
import { Observable, Subject, Subscription } from 'rxjs';
import { logging } from 'protractor';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit, OnDestroy {
  public personsObservable: Subject<Person[]>;
  private persons: Person[];
  private loadPersonSubscription: Subscription;
  private deletePersonSubscription: Subscription;

  constructor(private personsService: PersonsService, private logger: NGXLogger) {
  }

  ngOnInit() {
    this.logger.debug('Person component init');
    this.personsObservable = new Subject<Person[]>();
    this.loadPersonSubscription = this.personsService.loadPersons()
      .subscribe(persons => {
        this.logger.debug('Person component, persons loaded');
        this.persons = persons;
        this.personsObservable.next(persons);
      });
  }

  deletePerson(personId: number) {
    this.personsService.deletePerson(personId)
      .subscribe(id => {
        const personIndex = this.persons.findIndex(p => p.id === personId);
        this.persons.splice(personIndex, 1);
        this.personsObservable.next(this.persons);
      });
  }

  ngOnDestroy(): void {
  }
}
