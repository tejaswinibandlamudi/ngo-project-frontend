export interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  location: Location;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface SignupModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const initialLocation = {
  latitude: -1,
  longitude: -1
};

export const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  location: initialLocation
};

// export const intialLoginModel = {
//   email: "",
//   password: ""
// };

// export const intitalSignupModel = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: ""
// };
