import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserPrivate {
	@PrimaryColumn()
	id: string;

	@Column()
	password: string;
}
