import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Auth {
	@PrimaryColumn()
	id: string;

	@Column()
	token: string;

	@Column()
	user: string;

	@Column()
	createdAt: string;
}
