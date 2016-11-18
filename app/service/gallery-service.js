'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};

  service.galleries = [];

  service.createGallery = function(artistID, gallery){
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/artist/${artistID}/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, gallery, config);
    })

    .then( res => {
      $log.log('Succesfully created gallery');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })

    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID, artistID){
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/artist/${artistID}/gallery/${galleryID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('sucessful deletion');
      for(let i = 0; i < service.galleries.length; i++){
        let current = service.galleries[i];
        if(current._id === galleryID){
          service.galleries.splice(i,1);
          break;
        }
      }
      return $q.resolve('success');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchArtistGalleries = function(artistID){
    $log.debug('galleryService.fetchArtistGalleries()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/artist/${artistID}/gallery`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successful fetch user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGalleries()');

    let url = `${__API_URL__}/api/gallery/?sort=desc`;
    let config = {
      headers: {
        Accept: 'application/json',
      },
    };
    return $http.get(url, config)
    .then( res => {
      $log.log('successful fetch user galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateGallery = function(gallery, galleryID, artistID){
    $log.debug('galleryService.updateGalleries()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/artist/${artistID}/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.put(url, gallery, config);
    })
    .then( res => {
      for(let i = 0; i < service.galleries.length; i++){
        if (service.galleries[i]._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      $log.log('successful update user gallery');
      return $q.resolve('updated');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
