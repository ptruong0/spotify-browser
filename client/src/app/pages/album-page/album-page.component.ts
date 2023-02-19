import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css'],
  providers: [ SpotifyService ]
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');

    // get album data
    this.spotifyService.getAlbum(this.albumId)
    .then((resp => {
      this.album = resp;
      console.log(this.album)
    }));

    // get data for album tracks
    this.spotifyService.getTracksForAlbum(this.albumId)
    .then((resp) => {
      this.tracks = resp;
    })
  }

}
