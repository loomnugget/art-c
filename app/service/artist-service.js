// post route to create a profile when you signup
// get route that gets an artist's profile by id
// put route that updates an artist's profile
// delete route that deletes a an artist profile
'use strict';

module.exports = ['$q', '$log', '$http', 'authService', artistService];

function artistService($q, $log, $http, authService){
  $log.debug('init artistService');
  let service = {};

  service.artists = [];

  service.createArtist = function(artist){
    $log.debug('artistService.createArtist()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/artist`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, artist, config);
    })

    .then( res => {
      $log.log('Succesfully created artist');
      let artist = res.data;
      service.artists.unshift(artist);
      return artist;
    })

    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteArtist = function(artistID){
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/artist/${artistID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('sucessful deletion');
      for(let i = 0; i < service.artists.length; i++){
        let current = service.artists[i];
        if(current._id === artistID){
          service.artists.splice(i,1);
          break;
        }
      }
      return $q.resolve('Success!');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchArtists = function(){
    $log.debug('artistService.fetchArtists()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/artist/?sort=desc`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('Succesfully fetched artist profiles');
      service.artists = res.data;
      return service.artists;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateArtist = function(artist, artistID){
    $log.debug('artistService.updateArtist()');
    // call authService to get token
    return authService.getToken()
    // returns token
    .then( token => {
      // sends info to server
      let url = `${__API_URL__}/api/artist/${artistID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.put(url, artist, config);
    })

    .then( res => {

      for(let i = 0; i < service.artists.length; i++){
        if (service.artists[i]._id === artistID) {
          service.artists[i] = res.data;
          break;
        }
      }
      $log.log('Successfuly updated artist profile');
      return $q.resolve('Updated!');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
