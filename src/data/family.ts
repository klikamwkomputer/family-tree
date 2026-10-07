export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: string;
  deathDate?: string;
};

export type RelationshipType = 'PARENT' | 'PARTNER';

export type Relationship = {
  id: string;
  type: RelationshipType;
  fromPersonId: string;
  toPersonId: string;
};

export const people: Person[] = [
  {
    id: '1',
    firstName: 'Jan',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1950-04-12',
    deathDate: '2020-08-03',
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '1955-06-20',
  },
  {
    id: '3',
    firstName: 'Piotr',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1980-09-15',
  },
];

export const relationships: Relationship[] = [
  {
    id: 'r1',
    type: 'PARENT',
    fromPersonId: '1',
    toPersonId: '3',
  },
  {
    id: 'r2',
    type: 'PARENT',
    fromPersonId: '2',
    toPersonId: '3',
  },
  {
    id: 'r3',
    type: 'PARTNER',
    fromPersonId: '1',
    toPersonId: '2',
  },
];
