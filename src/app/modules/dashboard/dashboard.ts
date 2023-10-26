import { Paginator } from 'src/app/shared/interfaces';

export interface ActivityLog {
	id?: number; 
	user?: string;
	request_url: string;
	request_method: string;
	response_code: string;
	device?: string;
	browser?: string;
	os?: string;
	ip_address?: string;

	datetime: Date;
}

export interface ActivityLogList extends Paginator {
  results: [ActivityLog];
}
