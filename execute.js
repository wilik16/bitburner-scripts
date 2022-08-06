/** @param {NS} ns */
// let execScriptMem = 2.4;

export async function main(ns) {
	let servers = await ns.scan();
	for (var i = 0; i < servers.length; ++i) {
		let server = servers[i];
		if (server == "home" || server.startsWith("own-")) {
			continue;
		}	
	}
ns.fileExists(brutessh);

// let threadNum = Math.floor(ns.getServerMaxRam(server) / execScriptMem);
// await ns.exec(execScriptName, server, threadNum);
}