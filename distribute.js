/** @param {NS} ns */
let distributeScriptName = "distribute.js";
let doTheThingScriptName = "doTheThing.js";

var passedServers = [];

export async function main(ns) {
	let isBrutesshExist = ns.fileExists("BruteSSH.exe", "home");
	let isFtpcrackExist = ns.fileExists("FTPCrack.exe", "home");
	let isRelaysmtpExist = ns.fileExists("relaySMTP.exe", "home");
	let isHttpwormExist = ns.fileExists("HTTPWorm.exe", "home");
	let isSqlinjectExist = ns.fileExists("SQLInject.exe", "home");

	let servers = await ns.scan();
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];
		passedServers.push(server);
		if (server == "home" || server.startsWith("own-")) {
			continue;
		}
		let portsRequired = ns.getServerNumPortsRequired(server); 
		if (portsRequired == 0) {
			await ns.nuke(server);
			await ns.scp(distributeScriptName, server);
			await ns.scp(doTheThingScriptName, server);
			await ns.exec(distributeScriptName, server);
		} else if (portsRequired == 1) {
			await ns.brutessh(server);
			await ns.nuke(server);
			await ns.scp(distributeScriptName, server);
			await ns.scp(doTheThingScriptName, server);
			await ns.exec(distributeScriptName, server);
		} else if (portsRequired == 2) {
			await ns.brutessh(server);
			await ns.ftpcrack(server);
			await ns.nuke(server);
			await ns.scp(distributeScriptName, server);
			await ns.scp(doTheThingScriptName, server);
			await ns.exec(distributeScriptName, server);
		}
	}
}