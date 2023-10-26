import { Paginator } from 'src/app/shared/interfaces';

export interface Education {
	id?: number;
	institution: string;
	location: string;
	study_area: string;
	study_type: string;
	start_date: Date;
	end_date: Date;
	gpa: string;
	description: string;
	date_created?: Date;
}

export interface EducationList extends Paginator {
  	results: [Education];
}

export interface EducationError {
	institution?: [string];
	location?: [string];
	study_area?: [string];
	study_type?: [string];
	start_date?: [string];
	end_date?: [string];
	gpa?: [string];
	description?: [string];
}

