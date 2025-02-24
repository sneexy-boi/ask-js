import Fastify from 'fastify';
import pkg from '../../../package.json' with { type: 'json' };
import fastifyRateLimit from '@fastify/rate-limit';
import fastifySwagger from '@fastify/swagger';
import fastifyApiReference from '@scalar/fastify-api-reference';
import fastifyAutoload from '@fastify/autoload';
import * as path from 'node:path';
import db from './utils/db.js';
import AuthService from './services/AuthService.js';
import fastifyAuth from '@fastify/auth';
import fastifyVite from '@fastify/vite';

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
	.decorate('requireAuth', async (req, reply) => {
		let auth = await AuthService.verifyToken(req.headers.authorization);
		if (auth.error) throw new Error(auth.message);
		req.auth = auth?.auth;
	})
	.decorate('optionalAuth', async (req, reply, done) => {
		req.auth = (
			await AuthService.verifyToken(req.headers.authorization)
		)?.auth;
	})
	.register(fastifyAuth)
	.register(fastifyAutoload, {
		dir: path.join(process.cwd(), 'built', 'routes')
	});

await fastify;

fastify.listen(
	{ port: Number(process.env.PORT ?? 3579) },
	function (err, address) {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	}
);
