/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from 'hono';

type Bindings = {
	AI: any;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', async (c) => {
	const messages = [
		{ role: 'system', content: 'You are a Melbourne resident' },
		{
			role: 'user',
			content: 'What are some fun things to do in Sydney, Australia?',
		},
	];

	const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
		messages,
	});

	return c.json(response);
});

export default app;
