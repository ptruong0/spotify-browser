import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ],
})
export class SearchComponent implements OnInit {
  @ViewChild(CarouselComponent ) child: CarouselComponent ;

  searchString:string = null;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    window.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key == 'Enter') {
        this.search();
      }
    })
  }

  search() {
    //TODO: call search function in spotifyService and parse response
    if (this.searchString && this.searchString.length > 0) {
      this.spotifyService.searchFor(this.searchCategory, this.searchString)
    .then((resp) => {
      this.resources = resp;
    })
    }
  
  }

}
