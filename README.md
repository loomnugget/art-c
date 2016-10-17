[![Coverage Status](https://coveralls.io/repos/github/loomnugget/art-c/badge.svg?branch=staging)](https://coveralls.io/github/loomnugget/art-c?branch=staging)
[![Build Status](https://travis-ci.org/loomnugget/art-c.svg?branch=staging)](https://travis-ci.org/loomnugget/art-c)

####Contributors####
Lee Broxson, Max Friedrichsen, Claudia Cedfeldt, Elizabeth Kleinschmidt  
---
# **ART-C**

#### Art-C is a global-local art market, spotlighting local artists to both customers and other artists alike.

This REST API allows a developer to set up a site where users can create accounts to view, or display items.

An artist can create an _Artist Profile_ that allows them to make _Galleries_ of _Listings_ so that others can view their work.


## CURRENT VERSION `v0.0.5`

The current version of this API allows:
  - For **authorized Users** to **POST**, **GET**, **PUT** and **DELETE** User _Accounts_.
  - For **authorized Users** to **POST**, **PUT** and **DELETE** Artist _Profiles_, _Galleries_ and _Listings_.
  - For **all Users** to **GET** Artist's _Profile_ by **artistID**.
  - For **all Users** to **GET** Artist's _Galleries_ by **artistID** or **galleryID**.
  - For **all Users** to **GET** Artist's _Listings_ by **artistID**, **galleryID** or **listingID**.

---

# **Contribution and Use**


### **Issues**

- People who would like to let the developers know about an enhancement or bug concerning this API can create an Issue on the GitHub repo.
  - **Bug** if something is broken or missing(but we say it is there), select the _Bug_ label when creating the Issue.
  - **Enhancement** if there is something that you think will make our REST API that much better, submit an Issue with the _Enhancement_ label.

The development team will be notified when there is a new Issue on the Art-C repo.

### **Code Use**

In order to use this REST API on your own website, you will need to fork your own copy of this GitHub repo:
## [GitHub](https://github.com/loomnugget/art-c)

- You need to make sure that you have all the dependencies installed from the package.json file.
  You can run `npm install` in your local verson of the repo to automatically download all of our listed dependencies.

---

# **Models**
---

The Models for our _User Objects_ are:
  - **_User_**  
    - Account that allows individuals to **GET** other Artists' Profiles, Galleries and Listings.
  - **_Artist_**
    - Profile that allows users to **POST**, **PUT** and **DELETE** Galleries, Listings and Images associated with that Artist.
    - Can have an attached _Profile Image_
  - **_Gallery_**
    - Object that contains currently available _Listings_.
    - Can have an attached _Gallery Image_.
  - **_Listing_**
    - Object that shows a currently listed item.
    - Can have an attached _Listing Image_.
  - **_Image_**
    - Object that contains an image along with image properties.
    - Can be attached to _Artist_, _Gallery_ or _Listing_.

The Model properties can have various conditions which determine how the user interacts with them:
  - **[required]** | this property, if left off, will cause the object to not be created or affected.
  - **[unique]** | this property cannot match the same property of another, similar object.
  - **[input]** | this property is user-created.
  - **[generated]** | this property is created automatically, either by being generated when the object is created or pulled from another associated object.
  - **[validated]** | this property can be selected from a pre-made, validated list of options.
  - **[min-length #]** | this property has a minimum input-length of "#".

---

# **Routes**
---
The routes for this API essentially contain:
  - **Headers**
    - Bearer token provided on User Account creation.
  - **Body**
    - Contains user-input information.
    - Changes or creates properties when specified.
  - **Response**
    - Contains new, found or changed object available to user.
    - Shows properties on the object as-of the end of the request.


## **User Account**

The User Account is an object with the properties:
  - **_id** [required][generated]
  - **username** [required][unique][user-input]
  - **email** [required][unique][user-input]
  - **password** [required][user-input]
  - **findHash** [generated]

---
### Create _User_
Creates a new _User Object_ used to sign-in and affect other objects associated with that _User Object_.

  **POST request**
  ```
  #/api/setup
  ```
  - Expected _Headers_

    `null`

  - Expected _Body_

  ```json
     {
       "username": "<username>",
       "email": "<email>",
       "password": "<password>"
       }
  ```

  - Expected _Response_

    - status: `200`

    - body:
    ```json
    {}
    ```

---

### Find _User_
Finds and makes active a _User Object_ with **username**/**email** and **password**.

  ```
  #/api/login
  ```
  **GET request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    `null`

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {}
    ```

---

### Update _User_
Updates current _User Object_ property with new property.

  - Update **email**
    ```
    #/api/:userID/updateEmail
    ```
    **PUT request**
    - Expected _Headers_

      `Bearer <user token>`

    - Expected _Body_

       ```json
       {
        "email": "<new-email>"
       }
       ```

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
    **PUT request**
    - Expected _Headers_

      `Bearer <user-token>`

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
    **PUT request**
    - Expected _Headers_

      `Bearer <user-token>`

    - Expected _Body_

      ```json
      {
       "password": "<new password>"
      }
      ```

    - Expected _Response_
      - status: `200`
      - body:
      ```json
      {}
      ```

---
### Destroy _User_
  ```
  #/api/:userID/deleteAccount
  ```
  **DELETE request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    `null`

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    null
    ```

---

## **Artist Profile**

The Artist Profile is an object with the properties:
  - **_id** [required][generated]
  - **userID** [required][generated]
  - **galleries** [generated]
  - **photoID** [generated]
  - **username** [required][generated]
  - **created** [required][generated]
  - **firstname** [required][user-input][min-length 3]
  - **lastname** [required][user-input][min-length 3]
  - **city** [required]
  - **zip** [required]
  - **about**
  - **phone** [unique]

---
### Create _Artist_

  ```
  #/api/artist/:artistID
  ```
  **POST request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    ```json
    {
      "firstname": "<first-name>",
      "lastname": "<last-name>",
      "city": "<city>",
      "zip": "<zipcode>",
      "about": "<about-artist>",
      "phone": "<phone-number>"
    }
    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "_id": "<generated-id>",
      "firstname": "<first-name>",
      "lastname": "<last-name>",
      "city": "<city>",
      "zip": "<zipcode>",
      "about": "<about-artist>",
      "phone": "<phone-number>",
      "userID": "<pulled-user-id>",
      "username": "<pulled-username>",
      "email": "<pulled-email>",
      "__v": "0",
      "galleries": "[]<empty-galleries-array>",
      "created": "<generated-date>",
    }
    ```
---

### Find _Artist_
Finds _Artist Object_ using **artistID**.

  ```
  #/api/login
  ```
  **GET request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    `null`

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {}
    ```

---

### Update _Artist_

  ```
  #/api/artist/:artistID
  ```
  **PUT request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    ```json
    {
      "firstname": "<new-first-name>",
      "lastname": "<new-last-name>",
      "city": "<new-city>",
      "zip": "<new-zipcode>",
      "about": "<new-about-artist>",
      "phone": "<new-phone-number>"
    }
    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "_id": "<generated-id>",
      "firstname": "<new-first-name>",
      "lastname": "<new-last-name>",
      "city": "<new-city>",
      "zip": "<new-zipcode>",
      "about": "<new-about-artist>",
      "phone": "<new-phone-number>",
      "userID": "<pulled-user-id>",
      "username": "<pulled-username>",
      "email": "<pulled-email>",
      "__v": "0",
      "galleries": "[]<empty-array-for-galleries>",
      "created": "<generated-date>",
    }
    ```

---    
### Destroy _Artist_
  ```
  #/api/artist/:artistID
  ```
  **DELETE request**
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

    `null`

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

  #### Adding _Image_ to _Artist_
  ```
  #/api/artist/:artistID/photo
  ```
  - Expected _Headers_

  `Bearer <user-token>`

  - Expected _Body_

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Remove _Image_ from _Artist Profile_
  ```
  #/api/artist/:artistID/photo/:photoID
  ```
  - Expected _Headers_

  `Bearer <user-token>`

  - Expected _Body_

  `null`

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```

---

### **Gallery**

The Gallery is an object with the properties:
  - **_id** [required][generated]
  - **userID** [required][generated]
  - **artistID** [required][generated]
  - **listings** [generated]
  - **photoID** [generated]
  - **username** [required][unique][user-input]
  - **created** [required][generated]
  - **category** [required][input]
  - **name** [required][input]
  - **desc** [required][input]

  #### Create _Gallery_
  ```
  #/api/artist/:artistID/gallery
  ```
  - Expected _Headers_

    `Bearer <user-token>`

  - Expected _Body_

  ```json
    {
      "name": "<gallery-name>",
      "desc": "<description>",
      "category": "<category>"
    }
    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {
      "__v": "0",
      "name": "<gallery-name>",
      "desc": "<description>",
      "username": "<pulled-username>",
      "category": "<category>",
      "created": "<date>",
      "userID": "<pulled-userID>",
      "artistID": "<pulled-artistID>",
      "listings": "[]<array-for-listings>",
      "photoID": "<space-for-photoID>"
    }
    ```

  #### Find _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Updating _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Destroy _Gallery_
  ```
  #/api/artist/:artistID/gallery/:galleryID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Remove _Image_ from _Gallery_
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Find _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Update _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Destroy _Listing_
  ```
  #/api/gallery/:galleryID/listing/:listingID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

     }
    ```

  #### Remove _Image_ from _Listing_
  ```
  #/api/listing/:listingID/photo/:photoID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Remove an Image from Artist Profile
  ```
  #/api/artist/:artistID/photo/:photoID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

    }
    ```

  #### Remove an Image from Gallery
  ```
  #/api/gallery/:galleryID/photo/:photoID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

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

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `200`
    - body:
    ```json
    {

    }
    ```

  #### Remove an Image from Listing
  ```
  #/api/listing/:listingID/photo/:photoID
  ```
  - Expected _Headers_

   `Bearer <user-token>`

  - Expected _Body_

    ```json

    ```

  - Expected _Response_
    - status: `204`
    - body:
    ```json
    {}
    ```
