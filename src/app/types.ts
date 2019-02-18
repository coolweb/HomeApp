
// tslint:disable-next-line:interface-over-type-literal
export type Person = {
    id: number;
    firstName: string;
    lastName: string;
};

// tslint:disable-next-line:interface-over-type-literal
export type Query = {
    persons: Person[];
};

// tslint:disable-next-line:interface-over-type-literal
export type Mutation = {
    createPerson(firstName: String, lastName: String): Person;
    deletePerson(id: number): Person;
};
