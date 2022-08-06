/** @param {NS} ns */
/*
 * Run through all servers and run script on current rootable server
 */

let scriptName = "doTheThing.js";
let scriptMem = 2.4;

var processedServers = ["home"];

var isBrutesshExist = false;
var isFtpcrackExist = false;
var isRelaysmtpExist = false;
var isHttpwormExist = false;
var isSqlinjectExist = false;

export async function main(ns) {
	await checkExecutables(ns);
	await checkServer(ns, "home");
}

function checkExecutables(ns) {
	isBrutesshExist = ns.fileExists("BruteSSH.exe", "home");
	isFtpcrackExist = ns.fileExists("FTPCrack.exe", "home");
	isRelaysmtpExist = ns.fileExists("relaySMTP.exe", "home");
	isHttpwormExist = ns.fileExists("HTTPWorm.exe", "home");
	isSqlinjectExist = ns.fileExists("SQLInject.exe", "home");
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
		await processServer(ns, server);
		processedServers.push(server);
		await checkServer(ns, server);
	}
}

async function processServer(ns, server) {
	let portsRequired = ns.getServerNumPortsRequired(server);
	switch(true) {
	case portsRequired >= 5:
		if (!isSqlinjectExist) {
			break;
		}
		ns.sqlinject(server);
	case portsRequired >= 4:
		if (!isHttpwormExist) {
			break;
		}
		ns.httpworm(server);
		
	case portsRequired >= 3:
		if (!isRelaysmtpExist) {
			break;
		}
		ns.relaysmtp(server);
	case portsRequired >= 2:
		if (!isFtpcrackExist) {
			break;
		}
		ns.ftpcrack(server);
	case portsRequired >= 1:
		if (!isBrutesshExist) {
			break;
		}
		ns.brutessh(server);
	default:
		let threadNum = Math.floor(ns.getServerMaxRam(server) / scriptMem);
		if (threadNum == 0) {
			break;
		}
		await ns.nuke(server);
		await ns.scp(scriptName, server);
		await ns.exec(scriptName, server, threadNum);
	}
}