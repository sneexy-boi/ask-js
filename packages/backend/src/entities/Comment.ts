import typeorm, {
	Entity,
	Column,
	PrimaryColumn,
	ManyToOne,
	JoinColumn
} from 'typeorm';
import { Ask } from './Ask.js';
import { User } from './User.js';

@Entity()
export class Comment {
	@PrimaryColumn()
	id: string;

	@Column({ select: false })
	userId: string;

	@ManyToOne(() => User, (user) => user, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'userId' })
	user: typeorm.Relation<User>;

	@Column({ select: false })
	commentingOnId: string;

	@ManyToOne(() => Ask, (ask) => ask, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'commentingOnId' })
	commentingOn: typeorm.Relation<Ask>;

	@Column()
	content: string;

	@Column()
	createdAt: string;
}
