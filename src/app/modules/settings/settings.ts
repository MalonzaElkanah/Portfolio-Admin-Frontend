export interface AppSettings {
	app_name: string;
	logo: string;
	favicon: string;
}

export interface EmailSettings {
	smtp_server: string;
	port: string;
	email: string;
	password: string;
}

export interface PasswordSettings {
	old_password: string;
	confirm_password: string;
	new_password: string;
}

export interface ImageUploadResponse {
	path: string;
}

export interface DefaultResponse {
	detail: string;
}

export interface AppSettingsError {
	app_name?: [string];
	logo?: [string];
	favicon?: [string];
}

export interface EmailSettingsError {
	smtp_server?: [string];
	port?: [string];
	email?: [string];
	password?: [string];
}

export interface PasswordSettingsError {
	old_password?: [string];
	confirm_password?: [string];
	new_password?: [string];
}
