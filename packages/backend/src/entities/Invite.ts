import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Invite {
	@PrimaryColumn()
	id: string;

	@Column({ nullable: true })
	usedBy: string;

	@Column()
	code: string;

	@Column()
	creator: string;

	@Column()
	createdAt: string;
}
