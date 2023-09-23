import { Paginator } from 'src/app/shared/interfaces';

export interface SocialLink {
  id?: number; 
  name: string;
  logo: string;
  url: string;
  created?: Date;
}

export interface Profile {
  id?: number; // TODO: uuid strings 
  image?: string;
  first_name: string;
  second_name: string;
  description: string;
  cv_file?: string;
  email_1: string;
  email_2: string;
  address: string;
  phone_number_1: string;
  phone_number_2?: string;

  created?: Date;
  complete?: number;

  social_links?: [SocialLink];
}

export interface SocialLinkList extends Paginator {
  results: [SocialLink];
}

export interface SocialLinkError {
  name?: [string];
  logo?: [string];
  url?: [string];
}

export interface ProfileError {
  image?: [string];
  first_name?: [string];
  second_name?: [string];
  description?: [string];
  cv_file?: [string];
  email_1?: [string];
  email_2?: [string];
  address?: [string];
  phone_number_1?: [string];
  phone_number_2?: [string];
}

/*
{
  "image": [
    "The submitted data was not a file. Check the encoding type on the form."
  ],
  "cv_file": [
    "The submitted data was not a file. Check the encoding type on the form."
  ]
}

*/

