'use strict';

module.exports = ['$q', '$log', '$http', 'authService', listingService];

function listingService($q, $log, $http, authService) {
  $log.debug('init listingService');

  let service = {};

  service.listings = [];

  service.createListing = function(gallery, listing) {
    $log.debug('listingService.createListing');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}/listing`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, listing, config);
    })
    .then( res => {
      $log.log('Successfully created listing');
      let listing = res.data;
      gallery.listings.unshift(listing);
      return listing;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteListing = function(gallery, listing) {
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${listing.galleryID}/listing/${listing._id}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then( () => {
      $log.log('Successful listing deletion.');
      for(let i = 0; i < gallery.listings.length; ++i) {
        let current = gallery.listings[i];
        if (current._id === listing._id) {
          gallery.listings.splice(i, 1);
          break;
        }
      }
      return $q.resolve('Success');
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchGalleryListings = function(galleryID) {
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryID}/listing`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successfull fetch gallery listings');
      service.listings = res.data;
      return service.listings;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateListing = function(listing) {
    $log.debug('listingService.updateListings()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${listing.galleryID}/listing/${listing._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      return $http.put(url, listing, config);
    })
    .then( res => {
      console.log(res.data, 'RES.DATA');
      for(let i = 0; i < service.listings.length; i++) {
        if (service.listings[i]._id === listing._id) {
          service.listings[i] = res.data;
          break;
        }
      }
      $log.log('Successful update user listing');
      return $q.resolve('Updated listing');
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
