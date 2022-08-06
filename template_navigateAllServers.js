/** @param {NS} ns */
var processedServers = ["home"];

export async function main(ns) {
	// Start process from "home"
	await processServer(ns, "home");
}

async function processServer(ns, host) {
	let servers = await ns.scan(host);
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];

		// Skip previously processed servers and purchased servers
		if (processedServers.includes(server) || server.startsWith("own-")) {
			continue;
		}

		// Add current server to processedServers list, then process it
		processedServers.push(server);
		await processServer(ns, server);
	}
}