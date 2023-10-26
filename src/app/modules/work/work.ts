import { Paginator } from 'src/app/shared/interfaces';

export interface Highlight {
	id?: number;
	name: string;
	work?: number;
}

export interface Work {
	id?: number;
	company: string;
	location: string;
	position: string;
	website: string;
	start_date: Date;
	end_date: Date;
	date_created?: Date;

	highlights: [Highlight];
}

export interface WorkList extends Paginator {
  results: [Work];
}

export interface HighlightList extends Paginator {
  results: [Highlight];
}


export interface WorkError {
	company?: [string];
	location?: [string];
	position?: [string];
	website?: [string];
	start_date?: [string];
	end_date?: [string];
	date_created?: [string];

	highlights?: [];
}
