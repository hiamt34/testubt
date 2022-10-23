const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const os = require('os')

const interfaces = os.networkInterfaces();
let hostIp;
const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const interface of interfaces[name]) {
			const {address, family, internal} = interface;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};
server.use(middlewares);
server.use(router);
server.listen(port, '0.0.0.0', () => {
    console.log('Running at http://localhost:' + String(port) + ", on your network: http://" + String(hostIp) + ":" + String(port));
  });
