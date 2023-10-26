import { Paginator } from 'src/app/shared/interfaces';

export interface Category {
	name: string;
	article_count?: number;
	id?: number;
}

export interface Series {
	name: string;
	article_count?: number;
	id?: number;
}

export interface Reply {
	name: string;
	id?: number;
	email: string;
	message: string;
	date_created?: string;
}

export interface Comment {
	name: string;
	id?: number;
	email: string;
	message: string;
	date_created?: string;
	replies?: [Reply];
}

export interface User {
	first_name: string;
	last_name: string;
}

export interface Article {
	id?: number; // TODO: uuid strings 
	image?: string;
	title: string;
	content: any;
	tags: string;
	status: string;
	views?: number;
	date_created?: Date;
	user?: User;
	content_text?: string;

	series?: Series;
	category: Category;
	comments?: [Comment];
}

export interface ArticleList extends Paginator {
  results: [Article];
}

export interface CategoryList extends Paginator {
	results: [Category];
}

export interface SeriesList extends Paginator {
	results: [Series];
}

export interface CommentList extends Paginator {
  results: [Comment];
}

export interface ArticleError {
	image?: [string];
	title?: [string];
	content?: [string];
	tags?: [string];
	status?: [string];
	series?: [string];
	category?: [string];
	comments?: [string];
}

export interface CategoryError {
	name?: [string];
}

export interface SeriesError {
	name?: [string];
}

export interface ImageUploadResponse {
	path: string;
}
