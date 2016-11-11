'use strict';

module.exports = ['$q','$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('init picService');
  let service = {};

// Route for making an upload to Gallery
  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug('picService.uploadGalleryPic()');
    // Return promise
    return authService.getToken()
    // Get token
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      // Don't need key value pairs with object literals in ES6
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        // Information expected to be uploaded (required in the back-end)
        // Info is being sent as multi-part form data
        data: {
          name: picData.name,
          desc: picData.desc,
          file: picData.file,
        },
      });
    })
    // Get a response that returns an image
    .then( res => {
      // Add pic to the front of the array
      galleryData.pics.unshift(res.data);
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

// Upload an artist profile picture
  service.uploadArtistPic = function(artistData, picData) {
    $log.debug('picService.uploadArtistPic()');

    return authService.getToken()

    .then( token => {
      let url = `${__API_URL__}/api/artist/${artistData._id}/photo`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          alt: picData.alt,
          file: picData.file,
        },
      });
    })
    // Get a response that returns an image
    .then( res => {
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

// Route for deleting a pic - (this.gallery, this.pic._id) in controller
  service.deleteGalleryPic = function(galleryData, picID) {
    $log.debug('picService.deleteGalleryPic()');
    // Get a token from the auth service
    return authService.getToken()
    .then(token => {
      // Set the url to __API_URL__/api/gallery/:galleryID/pic/:picID
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picID}`;
      // Set config for http headers
      let config = {
        // Set authorization header
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    // Make $http.delete request to url with config
      return $http.delete(url, config);
    })

    // On success, splice the pic out of the galleryData.pics array
    .then(() => {
      $log.log('Deleted pic sucessfully');
      for(let i = 0; i < galleryData.pics.length; i++){
        let current = galleryData.pics[i];
        if(current._id === picID){
          galleryData.pics.splice(i,1);
          break;
        }
      }
      // Resolve undefined
      return $q.resolve(undefined);
    })
    // On error log error and reject error
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
