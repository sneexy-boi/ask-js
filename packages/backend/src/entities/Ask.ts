import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Ask {
	@PrimaryColumn()
	id: string;

	@Column()
	to: string;

	@Column({ nullable: true })
	cw: string;

	@Column()
	content: string;

	@Column({ nullable: true })
	nickname: string;

	@Column({ nullable: false, default: 'public' })
	visibility: string;

	@Column()
	createdAt: string;

	@Column({ nullable: true })
	response: string;
}
