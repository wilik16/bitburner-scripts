/** @param {NS} ns */
var processedServers = ["home"];

export async function main(ns) {
	// Start from "home"
	await checkServer(ns, "home", 0);
}

async function checkServer(ns, host, depth) {
	let servers = await ns.scan(host);
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];

		// Skip previously processed servers and purchased servers
		if (processedServers.includes(server) || server.startsWith("own-")) {
			continue;
		}

		// Process server, then add to processedServers list
        var depthString = "";
        for (var j = 0; j < depth; ++j) {
            depthString += "--";
        }
		ns.tprintf(depthString + server 
			+ " (" + ns.getServerMaxRam(server) + "GB-" 
			+ ns.getServerNumPortsRequired(server) + "-" 
			+ ns.getServerRequiredHackingLevel(server) + "-" 
			+ ns.hasRootAccess(server) + ")");
		processedServers.push(server);
		await checkServer(ns, server, depth+1);
	}
}