'use strict';

const AWSMock = require('aws-sdk-mock');

module.exports = exports = {};

exports.uploadMock = {
  ETag: '"ddad2cbff1bd8023ed7cd42e5059600a"',
  Location: 'https://artc-staging-assets.s3.amazonaws.com/03a7990e1adf9fa8944df58dfc81cc5b.jpg',
  key: '03a7990e1adf9fa8944df58dfc81cc5b.jpg',
  Key: '03a7990e1adf9fa8944df58dfc81cc5b.jpg',
  Bucket: 'artc-staging-assets',
};

AWSMock.mock('S3', 'upload', function(params, callback){
  if(params.ACL !== 'public-read')
    return callback(new Error('ACL must be public read'));
  if(params.Bucket !== 'artc-staging-assets')
    return callback(new Error('Bucket must be artc-staging-assets'));
  if(!params.Key)
    return callback(new Error('requres Key'));
  if(!params.Body)
    return callback(new Error('requires body'));
  callback(null, exports.uploadMock);
});

AWSMock.mock('S3', 'deleteObject', function(params, callback){
  if(params.Bucket !== 'artc-staging-assets')
    return callback(new Error('Bucket must be artc-staging-assets'));
  if(!params.Key)
    return callback(new Error('requires Key'));
  callback(null , {hello: 'sup'});
});
