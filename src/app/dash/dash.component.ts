import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';


import { SonosRepo } from '../core/repo/sonos.repo';
import { StarWarsPerson } from '../core/model';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  private url= environment.apiLocation;
  private roomName = 'shack';
  public liveDataFromSonos: String;
  public urlContent = [
    {title: 'Zones', url: this.url + '/zones', infoContent: ''},
    {title: 'Lock Volume', url: this.url + '/lockvolumes', infoContent: ''},
    {title: 'Unlock Volume', url: this.url + '/unlockvolumes', infoContent: ''},
    {title: 'Pause All', url: this.url + '/pauseall[/{timeout in minutes}]', infoContent: ''},
    {title: 'Resume All', url: this.url + '/resumeall[/{timeout in minutes}]', infoContent: ''},
    {title: 'Preset JSON', url: this.url + '/preset/{JSON preset}', infoContent: ''},
    {title: 'Preset Name', url: this.url + '/preset/{predefined preset name}', infoContent: ''},
    {title: 'Reindex', url: this.url + '/reindex', infoContent: ''},
    {title: 'Room Sleep', url: this.url + '/' + this.roomName + '/sleep/{timeout in seconds of "off"/}' , infoContent: ''},
    {title: 'Room Action', url: this.url + '/' + this.roomName + '{action}[/{parameter}]}', infoContent: ''}
  ];

  public starWarsPerson: StarWarsPerson;
  public starWarsPersonId: number;

  // sonos repo is provided by DI because it is listed as providers in the app module.
  constructor(private sonosRepo: SonosRepo ) {
    this.starWarsPersonId = 1;

    // TODO need a clean way to clear up these subs
    sonosRepo.dumbExampleGet().subscribe((value) => {
      // because we dont have type info on the api yet, we have to guess here
      this.liveDataFromSonos = value.dumbValue;
    });

    this.dumbStarWarsApiCall();
  }

  ngOnInit() {
  }

  // not attempting forms binding just yet as it is slightly more advanced
  // aka validation and submit acceptance.
  // this search will easily fail shrug
  searchForNewId() {
    this.dumbStarWarsApiCall();
  }


  private dumbStarWarsApiCall() {
    this.sonosRepo.dumbRealAPICall(this.starWarsPersonId).subscribe((swp) => {
      this.starWarsPerson = swp;
    });
  }
}
