/** @param {NS} ns */
var processedServers = ["home"];
var serverHackingLevel = 0;
var serverName = "";
var serverRequiredPorts = 0;

var playerHackingLevel = 0;
var portOpenerCount = 0;

export async function main(ns) {
    playerHackingLevel = ns.getHackingLevel();
    calculatePortOpenerCount(ns);
    await checkServer(ns, "home");
    ns.tprintf("Server to process \"" + serverName + "\", required hacking level: " + serverHackingLevel + " " + serverRequiredPorts);
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
		let requiredHackingLevel = ns.getServerRequiredHackingLevel(server);
        let requiredNumPorts = ns.getServerNumPortsRequired(server);
        if (requiredHackingLevel <= playerHackingLevel
            && requiredHackingLevel > serverHackingLevel
            && requiredNumPorts <= portOpenerCount) {
            serverHackingLevel = requiredHackingLevel;
            serverName = server;
            serverRequiredPorts = requiredNumPorts;
        }
		processedServers.push(server);
		await checkServer(ns, server);
	}
}

function calculatePortOpenerCount(ns) {
    if (ns.fileExists("BruteSSH.exe", "home")) {
        portOpenerCount++;
    }
    if (ns.fileExists("FTPCrack.exe", "home")) {
        portOpenerCount++;
    }
    if (ns.fileExists("relaySMTP.exe", "home")) {
        portOpenerCount++;
    }
    if (ns.fileExists("HTTPWorm.exe", "home")) {
        portOpenerCount++;
    }
    if (ns.fileExists("SQLInject.exe", "home")) {
        portOpenerCount++;
    }
}