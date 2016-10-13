[![Coverage Status](https://coveralls.io/repos/github/loomnugget/art-c/badge.svg?branch=staging)](https://coveralls.io/github/loomnugget/art-c?branch=staging)
[![Build Status](https://travis-ci.org/loomnugget/art-c.svg?branch=staging)](https://travis-ci.org/loomnugget/art-c)

---
# ART-C

##### Art-C is a global-local art market, spotlighting local artists to both customers and other artists alike.

This REST API allows a developer to set up a site where users can create accounts to view, or display items.
(REST API that returns JSON)

---

## **Setup**

---

This is how you get setup

---

## **Use**
---

### **User Account**

##### This is the basic

  ##### Adding a User Account
Creates a new User Object.

  ```
  #/api/setup
  ```
  ##### Finding a User Account
  ```
  #/api/login
  ```
  ##### Updating a User Account
  - Updating email
    ```
    #/api/:userID/updateEmail
    ```
  - Updating username
    ```
    #/api/:userID/updateUsername
    ```
  - Updating password
    ```
    #/api/:userID/updatePassword
    ```
  ##### Removing a User Account
  ```
  #/api/:userID/deleteAccount
  ```

---

### **Artist Profile**

  #### Adding an Artist Profile
  ```
  #/api/artist
  ```
  #### Finding an Artist Profile
  ```
  #/api/artist/:artistID
  ```
  #### Updating an Artist Profile
  ```
  #/api/artist/:artistID
  ```
  #### Removing an Artist Profile
  ```
  #/api/artist/:artistID
  ```
  #### Adding an Image to Artist Profile
  ```
  #/api/artist/:artistID/photo
  ```
  #### Removing an Image from Artist Profile
  ```
  #/api/artist/:artistID/photo/:photoID
  ```

---

### **Gallery**

  #### Adding a Gallery
  ```
  #/api/artist/:artistID/gallery
  ```
  #### Finding a Gallery
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  #### Updating a Gallery
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  #### Removing a Gallery
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  #### Adding an Image to Gallery
  ```
  #/api/gallery/:galleryID/photo
  ```
  #### Removing an Image from Gallery
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```

---

### **Listing**

  #### Adding a Listing
  ```
  #/api/gallery/:galleryID/listing
  ```
  #### Finding a Listing
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  #### Updating a Listing
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  #### Removing a Listing
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  #### Adding an Image to Listing
  ```
  #/api/listing/:listingID/photo
  ```
  #### Removing an Image from Listing
  ```
  #/api/listing/:listingID/photo/:photoID
  ```

---

### **Image**

  #### Adding an Image to Artist Profile
  ```
  #/api/artist/:artistID/photo
  ```
  #### Removing an Image from Artist Profile
  ```
  #/api/artist/:artistID/photo/:photoID
  ```
  #### Adding an Image to Gallery
  ```
  #/api/gallery/:galleryID/photo
  ```
  #### Removing an Image from Gallery
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```
  #### Adding an Image to Listing
  ```
  #/api/listing/:listingID/photo
  ```
  #### Removing an Image from Listing
  ```
  #/api/listing/:listingID/photo/:photoID
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
