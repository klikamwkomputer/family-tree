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
  divorced?: boolean;
};

// ======================================================
// OSOBY — 5 POKOLEŃ
// Zachowane oryginalne identyfikatory 1–11.
// ======================================================

export const people: Person[] = [
  // --------------------------------------------------
  // POKOLENIE 1 — najstarsze pokolenie
  // --------------------------------------------------

  {
    id: '1',
    firstName: 'Jan',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1945-03-12',
    deathDate: '2018-08-03',
  },
  {
    id: '2',
    firstName: 'Anna',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '1948-06-20',
  },
  {
    id: '12',
    firstName: 'Stanisław',
    lastName: 'Nowak',
    gender: 'MALE',
    birthDate: '1942-01-18',
    deathDate: '2010-11-22',
  },
  {
    id: '13',
    firstName: 'Helena',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '1946-09-05',
  },
  {
    id: '14',
    firstName: 'Władysław',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '1940-04-16',
    deathDate: '2005-02-11',
  },
  {
    id: '15',
    firstName: 'Jadwiga',
    lastName: 'Wiśniewska',
    gender: 'FEMALE',
    birthDate: '1944-12-01',
  },
  {
    id: '16',
    firstName: 'Franciszek',
    lastName: 'Zieliński',
    gender: 'MALE',
    birthDate: '1947-07-09',
    deathDate: '2019-06-14',
  },
  {
    id: '17',
    firstName: 'Krystyna',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '1950-02-25',
  },

  // --------------------------------------------------
  // POKOLENIE 2 — dzieci i ich partnerzy
  // --------------------------------------------------

  {
    id: '3',
    firstName: 'Piotr',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1970-09-15',
  },
  {
    id: '4',
    firstName: 'Maria',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '1973-02-08',
  },
  {
    id: '5',
    firstName: 'Katarzyna',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '1972-11-21',
  },
  {
    id: '6',
    firstName: 'Tomasz',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '1971-07-04',
  },
  {
    id: '7',
    firstName: 'Ewa',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '1975-05-17',
  },
  {
    id: '18',
    firstName: 'Marek',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1968-05-27',
  },
  {
    id: '19',
    firstName: 'Barbara',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '1970-08-13',
  },
  {
    id: '20',
    firstName: 'Andrzej',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '1968-03-30',
  },
  {
    id: '21',
    firstName: 'Monika',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '1977-10-19',
  },
  {
    id: '22',
    firstName: 'Paweł',
    lastName: 'Lewandowski',
    gender: 'MALE',
    birthDate: '1974-06-08',
  },
  {
    id: '23',
    firstName: 'Dorota',
    lastName: 'Lewandowska',
    gender: 'FEMALE',
    birthDate: '1976-01-14',
  },
  {
    id: '24',
    firstName: 'Jerzy',
    lastName: 'Kamiński',
    gender: 'MALE',
    birthDate: '1969-12-03',
  },
  {
    id: '25',
    firstName: 'Elżbieta',
    lastName: 'Kamińska',
    gender: 'FEMALE',
    birthDate: '1971-04-22',
  },

  // --------------------------------------------------
  // POKOLENIE 3 — wnuki
  // --------------------------------------------------

  {
    id: '8',
    firstName: 'Michał',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1998-01-25',
  },
  {
    id: '9',
    firstName: 'Julia',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '2001-10-09',
  },
  {
    id: '10',
    firstName: 'Zofia',
    lastName: 'Wiśniewska',
    gender: 'FEMALE',
    birthDate: '2000-04-14',
  },
  {
    id: '11',
    firstName: 'Adam',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '2003-12-05',
  },
  {
    id: '26',
    firstName: 'Karol',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '1992-07-17',
  },
  {
    id: '27',
    firstName: 'Natalia',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '1995-11-02',
  },
  {
    id: '28',
    firstName: 'Filip',
    lastName: 'Nowak',
    gender: 'MALE',
    birthDate: '1994-02-12',
  },
  {
    id: '29',
    firstName: 'Aleksandra',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '1999-08-26',
  },
  {
    id: '30',
    firstName: 'Mateusz',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '1996-06-21',
  },
  {
    id: '31',
    firstName: 'Weronika',
    lastName: 'Wiśniewska',
    gender: 'FEMALE',
    birthDate: '1998-03-06',
  },
  {
    id: '32',
    firstName: 'Patryk',
    lastName: 'Zieliński',
    gender: 'MALE',
    birthDate: '2000-09-18',
  },
  {
    id: '33',
    firstName: 'Karolina',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '2002-12-29',
  },
  {
    id: '34',
    firstName: 'Łukasz',
    lastName: 'Lewandowski',
    gender: 'MALE',
    birthDate: '1997-05-11',
  },
  {
    id: '35',
    firstName: 'Magdalena',
    lastName: 'Lewandowska',
    gender: 'FEMALE',
    birthDate: '1999-01-30',
  },
  {
    id: '36',
    firstName: 'Sebastian',
    lastName: 'Kamiński',
    gender: 'MALE',
    birthDate: '1995-04-04',
  },
  {
    id: '37',
    firstName: 'Agnieszka',
    lastName: 'Kamińska',
    gender: 'FEMALE',
    birthDate: '1998-07-23',
  },

  // --------------------------------------------------
  // POKOLENIE 4 — prawnuki
  // --------------------------------------------------

  {
    id: '38',
    firstName: 'Antoni',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '2020-02-15',
  },
  {
    id: '39',
    firstName: 'Maja',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '2022-09-07',
  },
  {
    id: '40',
    firstName: 'Oskar',
    lastName: 'Nowak',
    gender: 'MALE',
    birthDate: '2019-06-13',
  },
  {
    id: '41',
    firstName: 'Lena',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '2021-12-20',
  },
  {
    id: '42',
    firstName: 'Mikołaj',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '2023-03-01',
  },
  {
    id: '43',
    firstName: 'Pola',
    lastName: 'Wiśniewska',
    gender: 'FEMALE',
    birthDate: '2024-05-19',
  },
  {
    id: '44',
    firstName: 'Igor',
    lastName: 'Zieliński',
    gender: 'MALE',
    birthDate: '2020-10-10',
  },
  {
    id: '45',
    firstName: 'Emilia',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '2022-01-16',
  },
  {
    id: '46',
    firstName: 'Wiktor',
    lastName: 'Lewandowski',
    gender: 'MALE',
    birthDate: '2021-04-08',
  },
  {
    id: '47',
    firstName: 'Nina',
    lastName: 'Lewandowska',
    gender: 'FEMALE',
    birthDate: '2023-08-27',
  },

  // --------------------------------------------------
  // POKOLENIE 5 — najmłodsze pokolenie
  // --------------------------------------------------

  {
    id: '48',
    firstName: 'Tymon',
    lastName: 'Kowalski',
    gender: 'MALE',
    birthDate: '2044-01-12',
  },
  {
    id: '49',
    firstName: 'Laura',
    lastName: 'Kowalska',
    gender: 'FEMALE',
    birthDate: '2046-06-03',
  },
  {
    id: '50',
    firstName: 'Maksymilian',
    lastName: 'Nowak',
    gender: 'MALE',
    birthDate: '2043-04-25',
  },
  {
    id: '51',
    firstName: 'Olga',
    lastName: 'Nowak',
    gender: 'FEMALE',
    birthDate: '2045-11-09',
  },
  {
    id: '52',
    firstName: 'Bruno',
    lastName: 'Wiśniewski',
    gender: 'MALE',
    birthDate: '2047-02-18',
  },
  {
    id: '53',
    firstName: 'Iga',
    lastName: 'Wiśniewska',
    gender: 'FEMALE',
    birthDate: '2049-07-22',
  },
  {
    id: '54',
    firstName: 'Milan',
    lastName: 'Zieliński',
    gender: 'MALE',
    birthDate: '2044-09-30',
  },
  {
    id: '55',
    firstName: 'Klara',
    lastName: 'Zielińska',
    gender: 'FEMALE',
    birthDate: '2046-12-14',
  },
];

// ======================================================
// RELACJE — PARTNERZY I RODZICE
// ======================================================

export const relationships: Relationship[] = [
  // --------------------------------------------------
  // Jan i Anna
  // --------------------------------------------------

  {
    id: 'r1',
    type: 'PARTNER',
    fromPersonId: '1',
    toPersonId: '2',
  },
  {
    id: 'r2',
    type: 'PARENT',
    fromPersonId: '1',
    toPersonId: '3',
  },
  {
    id: 'r3',
    type: 'PARENT',
    fromPersonId: '2',
    toPersonId: '3',
  },
  {
    id: 'r4',
    type: 'PARENT',
    fromPersonId: '1',
    toPersonId: '4',
  },
  {
    id: 'r5',
    type: 'PARENT',
    fromPersonId: '2',
    toPersonId: '4',
  },

  // Jan i Anna → Marek
  {
    id: 'r17',
    type: 'PARENT',
    fromPersonId: '1',
    toPersonId: '18',
  },
  {
    id: 'r18',
    type: 'PARENT',
    fromPersonId: '2',
    toPersonId: '18',
  },

  // --------------------------------------------------
  // Piotr i Katarzyna
  // --------------------------------------------------

  {
    id: 'r6',
    type: 'PARTNER',
    fromPersonId: '3',
    toPersonId: '5',
  },
  {
    id: 'r7',
    type: 'PARENT',
    fromPersonId: '3',
    toPersonId: '8',
  },
  {
    id: 'r8',
    type: 'PARENT',
    fromPersonId: '5',
    toPersonId: '8',
  },
  {
    id: 'r9',
    type: 'PARENT',
    fromPersonId: '3',
    toPersonId: '9',
  },
  {
    id: 'r10',
    type: 'PARENT',
    fromPersonId: '5',
    toPersonId: '9',
  },

  // --------------------------------------------------
  // Maria i Tomasz oraz Ewa
  // --------------------------------------------------

  {
    id: 'r11',
    type: 'PARTNER',
    fromPersonId: '4',
    toPersonId: '6',
  },
  {
    id: 'r12',
    type: 'PARENT',
    fromPersonId: '4',
    toPersonId: '10',
  },
  {
    id: 'r13',
    type: 'PARENT',
    fromPersonId: '6',
    toPersonId: '10',
  },
  {
    id: 'r14',
    type: 'PARTNER',
    fromPersonId: '6',
    toPersonId: '7',
    divorced: true,
  },
  {
    id: 'r15',
    type: 'PARENT',
    fromPersonId: '6',
    toPersonId: '11',
  },
  {
    id: 'r16',
    type: 'PARENT',
    fromPersonId: '7',
    toPersonId: '11',
  },

  // --------------------------------------------------
  // Stanisław i Helena → Katarzyna oraz Barbara
  // --------------------------------------------------

  {
    id: 'r19',
    type: 'PARTNER',
    fromPersonId: '12',
    toPersonId: '13',
  },
  {
    id: 'r20',
    type: 'PARENT',
    fromPersonId: '12',
    toPersonId: '5',
  },
  {
    id: 'r21',
    type: 'PARENT',
    fromPersonId: '13',
    toPersonId: '5',
  },
  {
    id: 'r22',
    type: 'PARENT',
    fromPersonId: '12',
    toPersonId: '19',
  },
  {
    id: 'r23',
    type: 'PARENT',
    fromPersonId: '13',
    toPersonId: '19',
  },

  // --------------------------------------------------
  // Władysław i Jadwiga → Tomasz oraz Andrzej
  // --------------------------------------------------

  {
    id: 'r24',
    type: 'PARTNER',
    fromPersonId: '14',
    toPersonId: '15',
  },
  {
    id: 'r25',
    type: 'PARENT',
    fromPersonId: '14',
    toPersonId: '6',
  },
  {
    id: 'r26',
    type: 'PARENT',
    fromPersonId: '15',
    toPersonId: '6',
  },
  {
    id: 'r27',
    type: 'PARENT',
    fromPersonId: '14',
    toPersonId: '20',
  },
  {
    id: 'r28',
    type: 'PARENT',
    fromPersonId: '15',
    toPersonId: '20',
  },

  // --------------------------------------------------
  // Franciszek i Krystyna → Ewa oraz Monika
  // --------------------------------------------------

  {
    id: 'r29',
    type: 'PARTNER',
    fromPersonId: '16',
    toPersonId: '17',
  },
  {
    id: 'r30',
    type: 'PARENT',
    fromPersonId: '16',
    toPersonId: '7',
  },
  {
    id: 'r31',
    type: 'PARENT',
    fromPersonId: '17',
    toPersonId: '7',
  },
  {
    id: 'r32',
    type: 'PARENT',
    fromPersonId: '16',
    toPersonId: '21',
  },
  {
    id: 'r33',
    type: 'PARENT',
    fromPersonId: '17',
    toPersonId: '21',
  },

  // --------------------------------------------------
  // Marek i Barbara → Karol oraz Natalia
  // --------------------------------------------------

  {
    id: 'r34',
    type: 'PARTNER',
    fromPersonId: '18',
    toPersonId: '19',
  },
  {
    id: 'r35',
    type: 'PARENT',
    fromPersonId: '18',
    toPersonId: '26',
  },
  {
    id: 'r36',
    type: 'PARENT',
    fromPersonId: '19',
    toPersonId: '26',
  },
  {
    id: 'r37',
    type: 'PARENT',
    fromPersonId: '18',
    toPersonId: '27',
  },
  {
    id: 'r38',
    type: 'PARENT',
    fromPersonId: '19',
    toPersonId: '27',
  },

  // --------------------------------------------------
  // Barbara i drugi partner Paweł → Łukasz oraz Magdalena
  // Przykład osoby z więcej niż jednym związkiem.
  // --------------------------------------------------

  {
    id: 'r39',
    type: 'PARTNER',
    fromPersonId: '19',
    toPersonId: '22',
  },
  {
    id: 'r40',
    type: 'PARENT',
    fromPersonId: '19',
    toPersonId: '34',
  },
  {
    id: 'r41',
    type: 'PARENT',
    fromPersonId: '22',
    toPersonId: '34',
  },
  {
    id: 'r42',
    type: 'PARENT',
    fromPersonId: '19',
    toPersonId: '35',
  },
  {
    id: 'r43',
    type: 'PARENT',
    fromPersonId: '22',
    toPersonId: '35',
  },

  // --------------------------------------------------
  // Andrzej i Monika → Mateusz oraz Weronika
  // --------------------------------------------------

  {
    id: 'r44',
    type: 'PARTNER',
    fromPersonId: '20',
    toPersonId: '21',
  },
  {
    id: 'r45',
    type: 'PARENT',
    fromPersonId: '20',
    toPersonId: '30',
  },
  {
    id: 'r46',
    type: 'PARENT',
    fromPersonId: '21',
    toPersonId: '30',
  },
  {
    id: 'r47',
    type: 'PARENT',
    fromPersonId: '20',
    toPersonId: '31',
  },
  {
    id: 'r48',
    type: 'PARENT',
    fromPersonId: '21',
    toPersonId: '31',
  },

  // --------------------------------------------------
  // Paweł i Dorota → Filip oraz Aleksandra
  // --------------------------------------------------

  {
    id: 'r49',
    type: 'PARTNER',
    fromPersonId: '22',
    toPersonId: '23',
  },
  {
    id: 'r50',
    type: 'PARENT',
    fromPersonId: '22',
    toPersonId: '28',
  },
  {
    id: 'r51',
    type: 'PARENT',
    fromPersonId: '23',
    toPersonId: '28',
  },
  {
    id: 'r52',
    type: 'PARENT',
    fromPersonId: '22',
    toPersonId: '29',
  },
  {
    id: 'r53',
    type: 'PARENT',
    fromPersonId: '23',
    toPersonId: '29',
  },

  // --------------------------------------------------
  // Jerzy i Elżbieta → Sebastian oraz Agnieszka
  // --------------------------------------------------

  {
    id: 'r54',
    type: 'PARTNER',
    fromPersonId: '24',
    toPersonId: '25',
  },
  {
    id: 'r55',
    type: 'PARENT',
    fromPersonId: '24',
    toPersonId: '36',
  },
  {
    id: 'r56',
    type: 'PARENT',
    fromPersonId: '25',
    toPersonId: '36',
  },
  {
    id: 'r57',
    type: 'PARENT',
    fromPersonId: '24',
    toPersonId: '37',
  },
  {
    id: 'r58',
    type: 'PARENT',
    fromPersonId: '25',
    toPersonId: '37',
  },

  // --------------------------------------------------
  // Karol i Julia → Antoni oraz Maja
  // --------------------------------------------------

  {
    id: 'r59',
    type: 'PARTNER',
    fromPersonId: '26',
    toPersonId: '9',
  },
  {
    id: 'r60',
    type: 'PARENT',
    fromPersonId: '26',
    toPersonId: '38',
  },
  {
    id: 'r61',
    type: 'PARENT',
    fromPersonId: '9',
    toPersonId: '38',
  },
  {
    id: 'r62',
    type: 'PARENT',
    fromPersonId: '26',
    toPersonId: '39',
  },
  {
    id: 'r63',
    type: 'PARENT',
    fromPersonId: '9',
    toPersonId: '39',
  },

  // --------------------------------------------------
  // Filip i Aleksandra → Oskar oraz Lena
  // --------------------------------------------------

  {
    id: 'r64',
    type: 'PARTNER',
    fromPersonId: '28',
    toPersonId: '29',
  },
  {
    id: 'r65',
    type: 'PARENT',
    fromPersonId: '28',
    toPersonId: '40',
  },
  {
    id: 'r66',
    type: 'PARENT',
    fromPersonId: '29',
    toPersonId: '40',
  },
  {
    id: 'r67',
    type: 'PARENT',
    fromPersonId: '28',
    toPersonId: '41',
  },
  {
    id: 'r68',
    type: 'PARENT',
    fromPersonId: '29',
    toPersonId: '41',
  },

  // --------------------------------------------------
  // Mateusz i Weronika → Mikołaj oraz Pola
  // --------------------------------------------------

  {
    id: 'r69',
    type: 'PARTNER',
    fromPersonId: '30',
    toPersonId: '31',
  },
  {
    id: 'r70',
    type: 'PARENT',
    fromPersonId: '30',
    toPersonId: '42',
  },
  {
    id: 'r71',
    type: 'PARENT',
    fromPersonId: '31',
    toPersonId: '42',
  },
  {
    id: 'r72',
    type: 'PARENT',
    fromPersonId: '30',
    toPersonId: '43',
  },
  {
    id: 'r73',
    type: 'PARENT',
    fromPersonId: '31',
    toPersonId: '43',
  },

  // --------------------------------------------------
  // Patryk i Karolina → Igor oraz Emilia
  // --------------------------------------------------

  {
    id: 'r74',
    type: 'PARTNER',
    fromPersonId: '32',
    toPersonId: '33',
  },
  {
    id: 'r75',
    type: 'PARENT',
    fromPersonId: '32',
    toPersonId: '44',
  },
  {
    id: 'r76',
    type: 'PARENT',
    fromPersonId: '33',
    toPersonId: '44',
  },
  {
    id: 'r77',
    type: 'PARENT',
    fromPersonId: '32',
    toPersonId: '45',
  },
  {
    id: 'r78',
    type: 'PARENT',
    fromPersonId: '33',
    toPersonId: '45',
  },

  // --------------------------------------------------
  // Łukasz i Magdalena → Wiktor oraz Nina
  // --------------------------------------------------

  {
    id: 'r79',
    type: 'PARTNER',
    fromPersonId: '34',
    toPersonId: '35',
  },
  {
    id: 'r80',
    type: 'PARENT',
    fromPersonId: '34',
    toPersonId: '46',
  },
  {
    id: 'r81',
    type: 'PARENT',
    fromPersonId: '35',
    toPersonId: '46',
  },
  {
    id: 'r82',
    type: 'PARENT',
    fromPersonId: '34',
    toPersonId: '47',
  },
  {
    id: 'r83',
    type: 'PARENT',
    fromPersonId: '35',
    toPersonId: '47',
  },

  // --------------------------------------------------
  // POKOLENIE 5 — przykładowe przyszłe potomstwo
  // --------------------------------------------------

  // Antoni i Lena → Tymon oraz Laura
  {
    id: 'r84',
    type: 'PARTNER',
    fromPersonId: '38',
    toPersonId: '41',
  },
  {
    id: 'r85',
    type: 'PARENT',
    fromPersonId: '38',
    toPersonId: '48',
  },
  {
    id: 'r86',
    type: 'PARENT',
    fromPersonId: '41',
    toPersonId: '48',
  },
  {
    id: 'r87',
    type: 'PARENT',
    fromPersonId: '38',
    toPersonId: '49',
  },
  {
    id: 'r88',
    type: 'PARENT',
    fromPersonId: '41',
    toPersonId: '49',
  },

  // Oskar i Maja → Maksymilian oraz Olga
  {
    id: 'r89',
    type: 'PARTNER',
    fromPersonId: '40',
    toPersonId: '39',
  },
  {
    id: 'r90',
    type: 'PARENT',
    fromPersonId: '40',
    toPersonId: '50',
  },
  {
    id: 'r91',
    type: 'PARENT',
    fromPersonId: '39',
    toPersonId: '50',
  },
  {
    id: 'r92',
    type: 'PARENT',
    fromPersonId: '40',
    toPersonId: '51',
  },
  {
    id: 'r93',
    type: 'PARENT',
    fromPersonId: '39',
    toPersonId: '51',
  },

  // Mikołaj i Emilia → Bruno oraz Iga
  {
    id: 'r94',
    type: 'PARTNER',
    fromPersonId: '42',
    toPersonId: '45',
  },
  {
    id: 'r95',
    type: 'PARENT',
    fromPersonId: '42',
    toPersonId: '52',
  },
  {
    id: 'r96',
    type: 'PARENT',
    fromPersonId: '45',
    toPersonId: '52',
  },
  {
    id: 'r97',
    type: 'PARENT',
    fromPersonId: '42',
    toPersonId: '53',
  },
  {
    id: 'r98',
    type: 'PARENT',
    fromPersonId: '45',
    toPersonId: '53',
  },

  // Igor i Pola → Milan oraz Klara
  {
    id: 'r99',
    type: 'PARTNER',
    fromPersonId: '44',
    toPersonId: '43',
  },
  {
    id: 'r100',
    type: 'PARENT',
    fromPersonId: '44',
    toPersonId: '54',
  },
  {
    id: 'r101',
    type: 'PARENT',
    fromPersonId: '43',
    toPersonId: '54',
  },
  {
    id: 'r102',
    type: 'PARENT',
    fromPersonId: '44',
    toPersonId: '55',
  },
  {
    id: 'r103',
    type: 'PARENT',
    fromPersonId: '43',
    toPersonId: '55',
  },
];
