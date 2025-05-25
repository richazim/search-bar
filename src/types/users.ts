// Coordonnées géographiques de l'adresse
export interface Geo {
  lat: string;
  lng: string;
}

// Adresse complète d'un utilisateur
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

// Informations sur la société d'un utilisateur
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// Interface principale représentant un utilisateur
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}