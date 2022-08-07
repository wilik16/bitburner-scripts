/** @param {NS} ns */
let scriptName = "doTheThing.js";
let scriptMem = 2.4;
let ram = 8;

let thread = Math.floor(ram / scriptMem);

export async function main(ns) {
	var currentIndex = -1;

	let serverNamePrefix = "own-" + ram + "-";

	let servers = ns.scan("home");
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];
		if (server.startsWith(serverNamePrefix)) {
			currentIndex = Math.max(
				parseInt(server.substring(serverNamePrefix.length)),
				currentIndex
			)
		}
	}
	currentIndex++;

	while (currentIndex < ns.getPurchasedServerLimit()) {
		await ns.sleep(5000);
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			var hostname = ns.purchaseServer(serverNamePrefix + currentIndex, ram);
			await ns.scp(scriptName, hostname);
			await ns.exec(scriptName, hostname, thread);
			++currentIndex;
		}
	}
}