'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService){
  $log.debug('init galleryService');
  let service = {};

  service.galleries = [];

  service.createGallery = function(gallery){
    $log.debug('galleryService.createGallery()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery`;
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

  service.deleteGallery = function(galleryID){
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          //don't need accept- not getting anything back from server
          //Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      //ajax makes request to any url
      //we are pointing the url to our API
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

  service.fetchGalleries = function(){
    $log.debug('galleryService.fetchGalleries()');
    return authService.getToken()
    .then( token => {
      // __API_URL__ is set in the .env file
      let url = `${__API_URL__}/api/gallery/?sort=desc`;
      // can configure with querystring sort gallery/?sort=asc, sort=desc
      // sorts newest to oldest
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // Re-triggers the ng-repeat so all the galleries show up
      // Goes from [] to [with a bunch of galleries]
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

  service.updateGallery = function(gallery, galleryID){
    $log.debug('galleryService.updateGalleries()');
    // call authService to get token
    return authService.getToken()
    // returns token
    .then( token => {
      // sends info to server
      let url = `${__API_URL__}/api/gallery/${galleryID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // ajax request
      // makes request to API, parses, updates and responds
      return $http.put(url, gallery, config);
    })
    // get the response
    .then( res => {
      // iterate over gallery Controller
      // update the gallery in service.galleries
      for(let i = 0; i < service.galleries.length; i++){
        if (service.galleries[i]._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      // if sucessful, returns updated gallery and resolves the promise
      $log.log('successful update user gallery');
      return $q.resolve('updated');
    })
    // if not, rejects the promise and logs an error
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
