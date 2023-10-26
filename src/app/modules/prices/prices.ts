import { Paginator } from 'src/app/shared/interfaces';

export interface Keyword {
	id?: number;
	name: string;
	status: string;
}

export interface KeywordList extends Paginator {
  	results: [Keyword];
}

export interface Pricing {
	id?: number; // TODO: uuid strings 
	price: number;
	name: string;
	description?: string;

	keywords: [Keyword];
}

export interface PricingList extends Paginator {
  	results: [Pricing];
}

export interface PricingError {
	price?: [string];
	name?: [string];
	description?: [string];
}
