/** @param {NS} ns */
let distributeScriptName = "distribute.js";
let doTheThingScriptName = "doTheThing.js";

let brutessh = "BruteSSH.exe";
let ftpcrack = "FTPCrack.exe";

var passedServers = [];

export async function main(ns) {
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
			await ns.exec(brutessh, server);
			await ns.nuke(server);
			await ns.scp(distributeScriptName, server);
			await ns.scp(doTheThingScriptName, server);
			await ns.exec(distributeScriptName, server);
		} else if (portsRequired == 2) {
			await ns.exec(brutessh, server);
			await ns.exec(ftpcrack, server);
			await ns.nuke(server);
			await ns.scp(distributeScriptName, server);
			await ns.scp(doTheThingScriptName, server);
			await ns.exec(distributeScriptName, server);
		}
	}
}