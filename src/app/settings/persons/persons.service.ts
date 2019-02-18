import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Query, Mutation } from 'src/app/types';
import { Person } from 'src/app/shared/model/Person';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private personsQuery = gql`
  query persons {
    persons {
      id,
      firstName,
      lastName
    }
  }
  `;

  constructor(private apollo: Apollo,
    private httpLink: HttpLink) { }

  public loadPersons(): Observable<Person[]> {
    const persons = this.apollo.watchQuery<Query>(
      {
        query: gql`
        query persons {
          persons {
            id,
            firstName,
            lastName
          }
        }
        `
      }
    )
      .valueChanges
      .pipe(map(result => result.data.persons.map(p => {
        const person = new Person();
        person.firstName = p.firstName;
        person.lastName = p.lastName;
        person.id = p.id;
        return person;
      })));

    return persons;
  }

  public createPerson(firstName: string, lastName: string): Observable<Person> {
    const createPersonMutation = gql`mutation createPerson($firstName: String!, $lastName: String!) {
      createPerson(firstName: $firstName, lastName: $lastName) {
        id
      }
    }`;

    return this.apollo.mutate({
      mutation: createPersonMutation,
      variables: {
        firstName: firstName,
        lastName: lastName
      },
      update: (store, result: { data: { createPerson: { id: number } } }) => {
        const data = store.readQuery<Query>({ query: this.personsQuery });
        const p = new Person();
        p.firstName = firstName;
        p.lastName = lastName;
        p.id = result.data.createPerson.id;
        data.persons.push(p);

        store.writeQuery<Query>({ query: this.personsQuery, data: data });
      }
    })
      .pipe(map((result: any) => {
        const person = new Person();
        person.firstName = firstName;
        person.lastName = lastName;
        person.id = result.data.createPerson.id;

        return person;
      }));
  }

  deletePerson(personId: number): Observable<Person> {
    const deletePersonMutation = gql`mutation deletePerson($id: Int!) {
      deletePerson(id: $id) {
        id
      }
    }`;

    return this.apollo.mutate({
      mutation: deletePersonMutation,
      variables: {
        id: personId
      },
      update: (store, { data: { deletePerson } }) => {
        const data = store.readQuery<Query>({ query: this.personsQuery });
        const index = data.persons.findIndex(p => p.id === personId);
        if (index !== -1) {
          data.persons.splice(index, 1);
          store.writeQuery<Query>({ query: this.personsQuery, data: data });
        }
      }
    })
      .pipe(map((result: any) => {
        const person = new Person();
        person.id = result.data.deletePerson.id;

        return person;
      }));
  }
}
