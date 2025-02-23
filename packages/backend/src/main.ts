import Fastify from 'fastify';
import pkg from '../../../package.json' with { type: 'json' };
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifyApiReference from '@scalar/fastify-api-reference';
import fastifyAutoload from '@fastify/autoload';
import * as path from 'node:path';
import db from './utils/db.js';

const adminIds = Array.from(process.env.ADMIN_IDS ?? []);

const fastify = Fastify({
	logger: true
});

await db.initialize().then(() => {
	fastify.log.info('Database initialized');
});

fastify
	.register(fastifyRateLimit, {
		max: 250,
		timeWindow: '1 minute'
	})
	.register(fastifySwagger, {
		openapi: {
			info: {
				title: 'Aster Route Reference',
				version: pkg.version
			},
			components: {
				securitySchemes: {
					header: {
						type: 'http',
						scheme: 'bearer'
					}
				}
			}
		}
	})
	.register(fastifyApiReference, {
		routePrefix: '/api-doc',
		configuration: {}
	})
	.register(fastifyAutoload, {
		dir: path.join(process.cwd(), 'built', 'routes')
	});

fastify.listen(
	{ port: Number(process.env.PORT ?? 3579) },
	function (err, address) {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	}
);
