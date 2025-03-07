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
export class Reply {
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
	replyingToId: string;

	@ManyToOne(() => Ask, (ask) => ask, {
		onDelete: 'CASCADE'
	})
	@JoinColumn({ name: 'replyingToId' })
	replyingTo: typeorm.Relation<Ask>;

	@Column()
	content: string;

	@Column()
	createdAt: string;
}
