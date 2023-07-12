import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","location.png","logo.jpg","office.png","triangle.svg","user.png"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.1379d1fa.js","imports":["_app/immutable/entry/start.1379d1fa.js","_app/immutable/chunks/index.dcd2fa01.js","_app/immutable/chunks/singletons.8100a6de.js","_app/immutable/chunks/index.8f97fca2.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.6faceeba.js","imports":["_app/immutable/entry/app.6faceeba.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/index.dcd2fa01.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/authentication",
				pattern: /^\/api\/authentication\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../server/entries/endpoints/api/authentication/_server.js')
			},
			{
				id: "/api/genquery",
				pattern: /^\/api\/genquery\/?$/,
				params: [],
				page: null,
				endpoint: () => import('../server/entries/endpoints/api/genquery/_server.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
