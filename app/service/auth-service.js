'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window){
  $log.debug('init authService');
  // create service
  let service = {};
  service.token = null;

  service.setToken = function(_token){
    $log.debug('authService.service.setToken()');
    if (! _token)
      return $q.reject(new Error('no service.token'));
    $window.localStorage.setItem('service.token', _token);
    service.token = _token;
    return $q.resolve(service.token);
  };

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (service.token) return $q.resolve(service.token);
    service.token = $window.localStorage.getItem('service.token');
    if (service.token) return $q.resolve(service.token);
    return $q.reject(new Error('service.token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');
    $window.localStorage.removeItem('service.token');
    service.token = null;
    return $q.resolve();
  };

  service.signup = function(user) {
    $log.debug('authService.signup()');
    let url = `${__API_URL__}/api/signup`;
    console.log('signup url', url);

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      // res.data is the response body aka the service.token
      return service.setToken(res.data);
    })
    .catch(err => {
      $log.error('fail', err.message);
      return $q.reject(err);
    });
  };

  service.login = function(user){
    $log.debug('authService.login()');
    let url = `${__API_URL__}/api/login`;
    // base64 encoded 'username:password'
    let base64 = $window.btoa(`${user.username}:${user.password}`);

    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      },
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return service.setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  // return service
  return service;
}
