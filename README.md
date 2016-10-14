[![Coverage Status](https://coveralls.io/repos/github/loomnugget/art-c/badge.svg?branch=staging)](https://coveralls.io/github/loomnugget/art-c?branch=staging)
[![Build Status](https://travis-ci.org/loomnugget/art-c.svg?branch=staging)](https://travis-ci.org/loomnugget/art-c)

---
# ART-C

##### Art-C is a global-local art market, spotlighting local artists to both customers and other artists alike.

This REST API allows a developer to set up a site where users can create accounts to view, or display items.

An artist can create an _Artist Profile_ that allows them to make _Galleries_ of _Listings_ so that others can view their work.

The Artists, Galleries, Listings and Images are stored in a Mongo Database for


### CURRENT VERSION `v0.0.5`

The current version of this API allows:
- For authorized Users to **POST**, **GET**, **PUT** and **DELETE** User _Accounts_.
- For authorized Users to **POST**, **PUT** and **DELETE** Artist _Profiles_, _Galleries_ and _Listings_.
- For all Users to **GET** Artist's _Profile_ by **artistID**.
- For all Users to **GET** Artist's _Galleries_ by **artistID** or **galleryID**.
- For all Users to **GET** Artist's _Listings_ by **artistID**, **galleryID** or **listingID**.

---

## **Setup**

---

In order to use this REST API on your own website, you will need all the files from the GitHub repo you can clone the files from:
### [GitHub](https://github.com/loomnugget/art-c)
- Then you should open your terminal in the repo folder and type the command
```
npm install
```
to install all dependencies and dev-dependencies required to run the included code.

- To run the tests (in order to make sure you didn't break any of the functions) you can type the command
```
npm run test
```
  - if you want to target a specific test file, you can alter the command
  ```
  npm run test test/<your-test-file>.js
  ```



---

## **Use**
---

### **User Account**

  ##### Create _User_
Creates a new _User Object_.

  ```
  #/api/setup
  ```
  - Expected _Headers_
    - `(Bearer <user token>)`
  - Expected _Body_
  ```json
     {
       "username": "<username>",
       "password": "<password>"
       }
  ```
  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {}
    ```

  ##### Find _User_
Finds and returns a _User Object_ with associated **username**/**email** and **password**.

  ```
  #/api/login
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {}
    ```

  ##### Update _User Account_
Finds and updates a _User Object_ with associated

  - Update **email**
    ```
    #/api/:userID/updateEmail
    ```
    - Expected _Headers_
      - `(Bearer <user token>)`
    - Expected _Body_

    - Expected _Response_
      - status: `200`
      - body:
      ```json
      {}
      ```

  - Update **username**
    ```
    #/api/:userID/updateUsername
    ```
    - Expected _Headers_
      - `(Bearer <user token>)`
    - Expected _Body_
      ```json
      {
        "username": "<new username>"
      }
      ```
    - Expected _Response_
      - status: `200`
      - body:
        ```json
        {}
        ```

  - Update **password**
    ```
    #/api/:userID/updatePassword
    ```
    - Expected _Headers_
      - `(Bearer)`
    - Expected _Body_

    - Expected _Response_
      - status: `200`
      - body:
      ```json
      {}
      ```

  ##### Destroy _User Account_
  ```
  #/api/:userID/deleteAccount
  ```
  - Expected _Headers_
    - `(Bearer <user bearer token>)`
  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    null
    ```

---

### **Artist Profile**

  #### Create _Artist Profile_
  ```
  #/api/artist/:artistID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "_id": "5800040b82be13172f30ca4d",
      "firstname": "Vindra",
      "lastname": "Urywen",
      "city": "Forest",
      "zip": "92581",
      "about": "I am Vindra, graceful elven bard.",
      "phone": "4252255225",
      "userID": "58001780a93d821dda8c46cb",
      "username": "bard-tacular",
      "email": "vindra.the.graceful@elvenbards.com",
      "__v": "0",
      "galleries": "[]",
      "created": "2016-10-13T22:00:43.999Z",
    }
    ```

  #### Update _Artist Profile_
  ```
  #/api/artist/:artistID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "_id": "5800040b82be13172f30ca4d",
      "firstname": "Vindra",
      "lastname": "Urywen",
      "city": "Forest",
      "zip": "92581",
      "about": "I am Vindra, graceful elven bard.",
      "phone": "2069900022",
      "userID": "58001780a93d821dda8c46cb",
      "username": "bard-tacular",
      "email": "vindra.the.graceful@elvenbards.com",
      "__v": "0",
      "galleries": "[]",
      "created": "2016-10-13T22:00:43.999Z",
    }
    ```

  #### Destroy _Artist Profile_
  ```
  #/api/artist/:artistID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Adding _Image_ to _Artist Profile_
  ```
  #/api/artist/:artistID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "__v": "0",
      "name": "my-beautiful-face",
      "username": "bard-tacular",
      "alt": "sparkly",
      "objectKey": "03a7990e1adf9fa8944df58dfc81cc5b.jpg",
      "imageURI": "https://images.s3.amazonaws.com/03a7990e1adf9fa8944df58dfc81cc5b.jpg",
      "artistID": "58001780a93d821dda8c46cc",
      "userID": "58001780a93d821dda8c46cb",
      "_id": "58001781a93d821dda8c46cd"
    }
    ```

  #### Remove _Image_ from _Artist Profile_
  ```
  #/api/artist/:artistID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

---

### **Gallery**

  #### Create _Gallery_
  ```
  #/api/artist/:artistID/gallery
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "__v": "0",
      "name": "beautiful-lutes",
      "desc": "instruments for a fine bard like me.",
      "username": "bard-tacular",
      "category": "instruments",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "listings": "[]",
      "photoID": ""
    }
    ```

  #### Find _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "desc": "",
      "username": "bard-tacular",
      "category": "",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "listings": "[]",
      "photoID": ""
    }
    ```

  #### Updating _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "desc": "",
      "username": "bard-tacular",
      "category": "",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "listings": "[]",
      "photoID": ""
    }
    ```

  #### Destroy _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Add _Image_ to _Gallery_
  ```
  #/api/gallery/:galleryID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "alt": "",
      "objectKey": "",
      "imageURI": "",
      "username": "bard-tacular",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "listingID": ""
    }
    ```

  #### Remove _Image_ from _Gallery_
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

---

### **Listing**

  #### Create _Listing_
  ```
  #/api/gallery/:galleryID/listing
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "title": "",
      "desc": "",
      "username": "bard-tacular",
      "category": "",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "photoID": "",
    }
    ```

  #### Find _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "title": "",
      "desc": "",
      "username": "bard-tacular",
      "category": "",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "photoID": "",
    }
    ```

  #### Update _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "title": "",
      "desc": "",
      "username": "bard-tacular",
      "category": "",
      "created": "",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "photoID": "",
    }
    ```

  #### Destroy _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Add _Image_ to _Listing_
  ```
  #/api/listing/:listingID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "alt": "",
      "objectKey": "",
      "imageURI": "",
      "username": "bard-tacular",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "listingID": ""
    }
    ```

  #### Remove _Image_ from _Listing_
  ```
  #/api/listing/:listingID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

---

### **Image**

  #### Adding an Image to Artist Profile
  ```
  #/api/artist/:artistID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "alt": "",
      "objectKey": "",
      "imageURI": "",
      "username": "bard-tacular",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "listingID": ""
    }
    ```

  #### Remove an Image from Artist Profile
  ```
  #/api/artist/:artistID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Adding an Image to Gallery
  ```
  #/api/gallery/:galleryID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "alt": "",
      "objectKey": "",
      "imageURI": "",
      "username": "bard-tacular",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "listingID": ""
    }
    ```

  #### Remove an Image from Gallery
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Adding an Image to Listing
  ```
  #/api/listing/:listingID/photo
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "name": "",
      "alt": "",
      "objectKey": "",
      "imageURI": "",
      "username": "bard-tacular",
      "userID": "58001780a93d821dda8c46cb",
      "artistID": "58001780a93d821dda8c46cc",
      "galleryID": "",
      "listingID": ""
    }
    ```

  #### Remove an Image from Listing
  ```
  #/api/listing/:listingID/photo/:photoID
  ```
  - Expected _Headers_

  - Expected _Body_

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

---

```
#/api/login
```
- Expected Headers
  - blah
  - blah
- Expected body
  ```json
  {
    "name": "dunc",
    "email": "dunc@dunc.com",
    "blah"
  }
  ```
contributer's guide (look at atom's readme on github) contributing.md

Code of Conduct (... for tech Code of Conduct, holding people who try to contribute to this to be nice to others)




<!-- ## authRouter
  `/api/signup` - POST
- Requires a user name and password and generates a new user.
`/api/login` - GET
- Requires a valid existing user name and password and returns an existing user.

## artistRouter
`/api/artist` - POST
- Requires a valid user id and creates a new artist profle.
`/api/artist/:artistID` - GET
- Requires a valid artist id and responds with existing artist profile.
`/api/artist/:artistID` - PUT
- Requires a valid artist id and body and responds with updated artist profile.
`/api/artist/:artistID` - DELETE
- Requires a valid artist id and responds with empty object.

## galleryRouter
`/api/artist/:artistID/gallery` - POST
- Requires a valid artist id and creates a new gallery. The gallery id is saved in an array of galleries attached to an artist profile.
`/api/artist/:artistID/gallery/:galleryID` - GET
- Requires a valid gallery id and responds with existing gallery.
`/api/artist/:artistID/gallery/:galleryID` - PUT
- Requires a valid gallery id and body and responds with updated gallery.
`/api/artist/:artistID/gallery/:galleryID` - DELETE
- Requires a valid gallery id and responds with empty object.

## listingRouter
`/api/gallery/:galleryID/listing` - POST
- Requires a valid gallery id and creates a new listing. The listing id is saved in an array of listings attached to a gallery.
`/api/listing/:listingID` - GET
- Requires a valid listing id and responds with existing listing.
`/api/gallery/:galleryID/listing/:listingID` - PUT
- Requires a valid listing id and body and responds with updated listing.
`/api/gallery/:galleryID/listing/:listingID` - DELETE
- Requires a valid listing id and responds with empty object.

## photoRouter
`/api/artist/:artistID/photo` - POST
- Requires an artist id and returns a new photo attached to the artist profile.
`/api/artist/:artistID/photo/:photoID` - DELETE
- Requires valid photo id and deletes photo attached to the corresponding artist profile.
`/api/gallery/:galleryID/photo` - POST
- Requires a gallery id and returns a new photo attached to the matching gallery.
`/api/gallery/:galleryID/photo/:photoID` - DELETE
- Requires valid photo id and deletes photo attached to the corresponding gallery.
`/api/listing/:listingID/photo` - POST
- Requires a listing id and returns a new photo attached to the matching listing.
`/api/listing/:listingID/photo/:photoID` - DELETE
- Requires valid photo id and deletes photo attached to the corresponding listing. -->
