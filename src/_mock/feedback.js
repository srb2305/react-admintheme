import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  title: faker.person.fullName(),
  description: faker.company.name(),
  type: sample(['active', 'banned']),
}));
