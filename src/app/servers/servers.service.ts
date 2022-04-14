export interface Server {
  id: number;
  name: string;
  status: string;
}

export class ServersService {
  private servers: Server[] = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online',
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline',
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline',
    },
  ];

  getServers() {
    return this.servers;
  }

  getServer(id: number) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      return server;
    }
    return null;
  }

  updateServer(id: number, serverInfo: { name: string; status: string }) {
    const server = this.servers.find((s) => {
      return s.id === id;
    });
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
}
