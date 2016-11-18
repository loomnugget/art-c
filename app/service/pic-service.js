'use strict';

module.exports = ['$q','$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('init picService');
  let service = {};

  service.uploadListingPic = function(listing, picData) {
    $log.debug('picService.uploadGalleryPic()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/listing/${listing._id}/photo`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData.file,
        },
      });
    })
    .then( res => {
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.uploadGalleryPic = function(gallery, picData) {
    $log.debug('picService.uploadGalleryPic()');
    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/gallery/${gallery._id}/photo`;
      let headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      };
      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          file: picData.file,
        },
      });
    })
    .then( res => {
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

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
          file: picData.file,
        },
      });
    })
    .then( res => {
      $log.log('success!\n', res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleryPic = function(galleryData, picID) {
    $log.debug('picService.deleteGalleryPic()');
    return authService.getToken()
    .then(token => {
      let url = `${__API_URL__}/api/gallery/${galleryData._id}/pic/${picID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then(() => {
      $log.log('Deleted pic sucessfully');
      for(let i = 0; i < galleryData.pics.length; i++){
        let current = galleryData.pics[i];
        if(current._id === picID){
          galleryData.pics.splice(i,1);
          break;
        }
      }
      return $q.resolve(undefined);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
