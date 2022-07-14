import unreal from "../unreal";

export interface IUserAddress {
  id: string;
  user_id: string;
  state: string;
  city: string;
  street_address: string;
  postal_code: string;
  full_address: string;
  address_description: string;
}

const newAddress = (user_id: string) => {
  const state = unreal.address.randomState();
  const city = unreal.address.randomCity();
  const postal_code = unreal.address.randomPostalCode(state);

  const address = {
    user_id: user_id,
    state: state,
    city: city,
    street_address: unreal.address.randomStreetAddress(),
    postal_code: postal_code,
    full_address: unreal.address.randomFullAddress(state, city, postal_code),
    address_description: unreal.text.randomDescription(5),
  };

  return address;
};
