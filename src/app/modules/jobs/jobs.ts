import { Paginator } from 'src/app/shared/interfaces';

export interface JobSite {
  id?: number;
  site_name: string;
  job_list_link: string;
  job_link_element: string;
  site_type: string;
  date_created?: Date;
  job_count?: number; 
  applied_job_count?: number;

  name_element?: string;
  experience_element?: string;
  description_element?: string;
  organization_element?: string;
  address_element?: string;
  deadline_element?: string;
  attribute_element?: string;
  qualification_element?: string;
}

export interface Qualification {
  id?: number;
  name: string;
}

export interface Attribute {
  id?: number;
  name: string;
}

export interface Job {
  id?: number; 
  job_site: string;
  name: string;
  experience?: string;
  description?: string;
  organization?: string;
  address?: string;
  status?: string;
  deadline?: string;
  link?: string;
  date_created?: Date;
  attributes: Attribute[];
  qualifications: Qualification[];
}

export interface JobList extends Paginator {
  results: Job[];
}

export interface JobSiteList extends Paginator {
  results: JobSite[];
}

export interface JobSiteError {
  site_name?: [string];
  job_list_link?: [string];
  job_link_element?: [string];
  site_type?: [string];
  date_created?: [string];
  name_element?: [string];
  experience_element?: [string];
  description_element?: [string];
  organization_element?: [string];
  address_element?: [string];
  deadline_element?: [string];
  attribute_element?: [string];
  qualification_element?: [string];
}

export interface Letter {
  id?: number;
  name: string;
  file?: string;
  text?: string;
  strip_tag_text?: string;
  description?: string;
  date_created?: Date;
}

export interface LetterList extends Paginator {
  results: Letter[];
}

export interface LetterError {
  name?: [string];
  file?: [string];
  text?: [string];
  description?: [string];
}

export interface JobApplication {
  id?: number;
  job: any;
  cv?: string;
  cover_letter?: string;
  application_type?: string;
  status?: string;
  letter?: any;
  feedback?: string;
  feedback_type?: string;
  date_created?: Date;
}

export interface JobApplicationList extends Paginator {
  results: JobApplication[];
}

export interface JobApplicationError {
  job?: [string];
  cv?: [string];
  cover_letter?: [string];
  application_type?: [string];
  status?: [string];
  letter?: [string];
  feedback?: [string];
  feedback_type?: [string];
}
