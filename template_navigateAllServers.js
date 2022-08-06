/** @param {NS} ns */
var processedServers = ["home"];

export async function main(ns) {
	// Start from "home"
	await checkServer(ns, "home");
}

async function checkServer(ns, host) {
	let servers = await ns.scan(host);
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];

		// Skip previously processed servers and purchased servers
		if (processedServers.includes(server) || server.startsWith("own-")) {
			continue;
		}

		// Process server, then add to processedServers list
		// TODO: insert process here
		processedServers.push(server);
		await checkServer(ns, server);
	}
}