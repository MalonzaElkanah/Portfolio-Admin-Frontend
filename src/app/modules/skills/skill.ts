import { Paginator } from 'src/app/shared/interfaces';

export interface SkillKeyword {
	id?: number;
	name: string;
}

export interface Skill {
	id?: number;
	name: string;
	description?: string;
	keywords: [SkillKeyword];
}

/*
{
    "id": 2,
    "skill_keyword": {
        "id": 39,
        "name": " Python",
        "date_created": "2023-01-04T13:33:35.847000Z",
        "skill": 1
    },
    "percentage": 90,
    "date_created": "2021-12-22T12:20:41.194000Z"
}
*/

export interface TechnicalSkill {
	id?: number;
	percentage: number;
	skill_keyword: SkillKeyword;
}

export interface ProfessionalSkill {
	percentage: number;
	name: string;
	id?: number;
}

export interface SkillList extends Paginator {
  results: [Skill];
}

export interface TechnicalSkillList extends Paginator {
  results: [TechnicalSkill];
}

export interface ProfessionalSkillList extends Paginator {
  results: [ProfessionalSkill];
}

export interface SkillError {
	name: [string];
	description?: [string];
	keywords?: [string];
}
