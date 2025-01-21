module.exports = {
	apps: [
		{
			name: "frontend", // Name of the frontend process
			script: "npx",
			args: "serve -s frontend/dist --listen 8000",
		},
		{
			name: "backend", // Name of the backend process
			script: "npm",
			args: "start", // Command to start the backend
			cwd: "backend", // Working directory for the backend
		},
	],
};
