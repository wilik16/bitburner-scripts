/** @param {NS} ns */
/*
 * Print route to target server
 * run routeToServer.js target_server start_server?
 */

var processedServers = ["home"];

var targetServer = "";
var startServer = "home";

export async function main(ns) {
	targetServer = ns.args[0];
    if (ns.args[1] != null) {
        startServer = ns.args[1];
    }
    
    processedServers.push(startServer);
	await checkServer(ns, startServer, startServer);
}

async function checkServer(ns, host, route) {
	let servers = await ns.scan(host);
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];

		// Skip previously processed servers and purchased servers
		if (processedServers.includes(server) || server.startsWith("own-")) {
			continue;
		}

		// Process server, then add to processedServers list
        let newRoute = route + " -> " + server;
        if (server == targetServer) {
            ns.tprintf(newRoute);
            ns.exit();
        }

		processedServers.push(server);
		await checkServer(ns, server, newRoute);
	}
}