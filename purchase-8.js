/** @param {NS} ns */
let doTheThingScriptName = "doTheThing.js";

export async function main(ns) {
	var ram = 8;
	var i = 0;

	while (i < ns.getPurchasedServerLimit()) {
		await ns.sleep(5000);
		if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
			var hostname = ns.purchaseServer("own-" + i, ram);
			await ns.scp(doTheThingScriptName, hostname);
			await ns.exec(doTheThingScriptName, hostname, 3);
			++i;
		}
	}
}