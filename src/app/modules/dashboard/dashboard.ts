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

export interface VisitorCount {
	date: Date;
  ip_addresses: any[];
  requests_count: number;
}

export interface VisitorStat {
	day: number;
  week: number;
	month: number;
  year: number;
}

export interface ActivityLogList extends Paginator {
  results: [ActivityLog];
}

export interface VisitorCountList extends Paginator {
  results: [VisitorCount];
}
