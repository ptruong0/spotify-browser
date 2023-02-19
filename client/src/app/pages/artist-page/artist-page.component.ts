import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  providers: [ SpotifyService ],
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
    
   }

  ngOnInit() {
    // every time artist id changes in the params, fetch data for new artist
    this.route.params.subscribe((params: {}) => {
      this.artistId = params['id']
      //this.artistId = this.route.snapshot.paramMap.get('id');

    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId)
    .then((resp) => {
      console.log(resp);
      this.artist = resp;
    })

    this.spotifyService.getRelatedArtists(this.artistId)
    .then((resp) => {
      this.relatedArtists = resp;
      console.log(this.relatedArtists)
    });

    this.spotifyService.getTopTracksForArtist(this.artistId)
    .then((resp) => {
      this.topTracks = resp;
    });

    this.spotifyService.getAlbumsForArtist(this.artistId)
    .then((resp) => {
      this.albums = resp;
    })
  });

  	//this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId)
    .then((resp) => {
      console.log(resp);
      this.artist = resp;
    })

    this.spotifyService.getRelatedArtists(this.artistId)
    .then((resp) => {
      this.relatedArtists = resp;
      console.log(this.relatedArtists)
    });

    this.spotifyService.getTopTracksForArtist(this.artistId)
    .then((resp) => {
      this.topTracks = resp;
    });

    this.spotifyService.getAlbumsForArtist(this.artistId)
    .then((resp) => {
      this.albums = resp;
    })
  }

}