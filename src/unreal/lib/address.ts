import { faker } from "@faker-js/faker";

export const randomFullAddress = (state: any, city: any, postalCode: any) =>
  `${state}, ${city}, ${postalCode}`;
export const randomStreetAddress = () => faker.address.streetAddress();
export const randomCity = () => faker.address.city();
export const randomState = () => faker.address.state();
export const randomPostalCode = (state: string) =>
  faker.address.zipCodeByState(state);
export const randomCountry = () => faker.address.country();
