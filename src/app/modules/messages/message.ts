import { Paginator } from 'src/app/shared/interfaces';

export interface Message {
	id: number; // TODO: uuid strings
	first_name: string;
	last_name?: string;
	email: string;
	message: string;
	status: string;
	date_created: Date;
}

export interface MessageList extends Paginator {
  results: [Message];
}
