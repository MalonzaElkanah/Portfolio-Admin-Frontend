import { Paginator } from 'src/app/shared/interfaces';

export interface Service {
	name: string;
	logo: string;
	description: string;
	id?: number;
}

export interface ServiceList extends Paginator {
  	results: [Service];
}

export interface ServiceError {
	name?: [string];
	logo?: [string];
	description?: [string];
}
