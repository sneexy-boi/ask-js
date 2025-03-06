import { Entity, Column, PrimaryColumn } from 'typeorm';

export type AutopostTargetType = 'mastodon' | 'misskey';
export type AutopostTargetMarkdownType = 'none' | 'standard' | 'misskey';

@Entity()
export class AutopostTarget {
	@PrimaryColumn()
	id: string;

	@Column()
	user: string;

	@Column()
	token: string;

	@Column()
	domain: string;

	@Column({
		type: 'enum',
		enum: ['mastodon', 'misskey'],
		default: null
	})
	target: AutopostTargetType;

	@Column({
		type: 'enum',
		enum: ['none', 'standard', 'misskey'],
		default: null
	})
	markdown: AutopostTargetMarkdownType;

	@Column()
	createdAt: string;

	// mastodon

	@Column({ nullable: true })
	masto_clientid: string;

	@Column({ nullable: true })
	masto_clientsecret: string;

	@Column({ nullable: true })
	masto_token: string;

	// misskey

	@Column({ nullable: true })
	mk_clientid: string;

	@Column({ nullable: true })
	mk_clientsecret: string;

	@Column({ nullable: true })
	mk_token: string;
}
