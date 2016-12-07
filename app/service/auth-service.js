'use strict';

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window){
  $log.debug('init authService');
  let service = {};
  service.token = null;

  service.setToken = function(_token){
    $log.debug('authService.service.setToken()');
    if (! _token)
      return $q.reject(new Error('no service.token'));
    $window.localStorage.setItem('token', _token);
    service.token = _token;
    return $q.resolve(service.token);
  };

  service.getToken = function(){
    $log.debug('authService.getToken');
    if (service.token) return $q.resolve(service.token);
    service.token = $window.localStorage.getItem('token');
    if (service.token) return $q.resolve(service.token);
    return $q.reject(new Error('token not found'));
  };

  service.logout = function(){
    $log.debug('authService.logout()');
    $window.localStorage.removeItem('token');
    service.token = null;
    return $q.resolve();
  };

  service.signup = function(user) {
    $log.debug('authService.signup()');
    let url = `${__API_URL__}/api/signup`;

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.debug('success', res.data);
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
    let base64 = $window.btoa(`${user.username}:${user.password}`);

    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      },
    };

    return $http.get(url, config)
    .then( res => {
      $log.debug('success', res.data);
      return service.setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}
