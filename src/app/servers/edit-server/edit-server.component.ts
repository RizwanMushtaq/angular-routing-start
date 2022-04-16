import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService, Server } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css'],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: Server | undefined;
  serverName: string = '';
  serverStatus: string = '';
  allowEdit = false;
  id: number;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe();
    this.route.fragment.subscribe();

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });

    this.route.url.subscribe((url: any) => {
      this.id = +url[0].path;
    });

    this.server = this.serversService.getServer(this.id);
    if (this.server) {
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    }
  }

  onUpdateServer() {
    if (this.server) {
      this.serversService.updateServer(this.server.id, {
        name: this.serverName,
        status: this.serverStatus,
      });
      this.changesSaved = true;
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (
      (this.serverName !== this.server?.name ||
        this.serverStatus !== this.server?.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
