'use strict';

process.env.MONGODB_URI = 'mongodb://localhost/artctesting';
process.env.PORT = 3000;
process.env.NODE_ENV = 'testing';
process.env.APP_SECRET = 'super cool fake secret for tests';
process.env.AWS_ACCESS_KEY_ID = 'FAKEKEYFORAWS';
process.env.AWS_SECRET_ACCESS_KEY = 'FAKEACESSKEY';
