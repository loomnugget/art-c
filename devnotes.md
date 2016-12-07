![Smart dog, doing science](https://images.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-3El_jidAW4Q%2FUVCFt4ZoUoI%2FAAAAAAAAA_4%2FBf99uG6wjDI%2Fs1600%2FI%2Bhave%2Bno%2Bidea%2Bwhat%2BI%2Bam%2Bdoing.jpg&f=1 "This is how I feel, right now...")

---
# MODELS
---

## User Model v. 0.0.5
##### Creates a User object
- **username**
  - required
  - unique
  - input
- **email**
  - required
  - unique
  - input
- **password**
  - required
  - input
- **findHash**
  - unique
  - generated for User

## Photo Model v. 0.0.5
##### Creates a Photo object
- **name**
  - required
  - input
- **alt**
  - required
  - input
- **objectKey**
  - required
  - unique
  - generated for Photo
- **imageURI**
  - required
  - unique
  - generated for Photo
- **username**
  - required
  - added from associated User
- **userID**
  - required
  - added from associated User
- **artistID**
  - required
  - added from associated Artist
- **galleryID**
  - optional
  - added from associated Gallery
- **listingID**
  - optional
  - added from associated Listing

## Artist Model v. 0.0.5
##### Creates an Artist object
- **about**
  - optional
  - input
- **phone**
  - optional
  - unique
  - input
- **email**
  - required
  - unique
  - added from associated User
- **username**
  - required
  - unique
  - added from associated User
- **created**
  - required
  - generated for Artist  
- **firstname**
  - required
  - input
  - length minimum of 3
- **lastname**
  - required
  - input
  - length minimum of 3
- **city**
  - required
  - input
- **zip**
  - optional
  - input
- **userID**
  - required
  - added from associated User
- **galleries** [array]
  - added from associated Galleries
- **photoID**
  - added from associated Photo

## Gallery Model v. 0.0.5
##### Creates a Gallery object
- **name**
  - required
  - input
- **desc** (description)
  - required
  - input
- **username**
  - required
  - added from associated User
- **category**
  - required
  - input
  - validated
- **created**
  - required
  - generated for Gallery
- **userID**
  - required
  - added from associated User
- **artistID**
  - required
  - added from associated Artist
- **listings** [array]
  - added from associated Listings
- **photoID**
  - added from associated Photo

## Listing Model v. 0.0.5
##### Creates a Listing object
- **title**
  - required
  - input
- **desc** (description)
  - required
  - input
- **username**
  - required
  - added from associated User
- **category**
  - required
  - input
  - validated
- **created**
  - required
  - generated for Listing
- **userID**
  - required
  - added from associated User
- **artistID**
  - required
  - added from associated Artist
- **galleryID**
  - required
  - added from associated Gallery
- **photoID**
  - added from associated Photo

---
# ROUTES
---

## Auth Routes v. 0.0.5


### **Signup**
```
/api/signup
```
- POST request
- Creates User object

### **Login**
```
/api/login
```
- GET request
- Finds User object using **username** and **password**

## Photo Routes v. 0.0.5

### **Add Artist Photo**
```
/api/artist/:artistID/photo
```
- POST request
- Creates Photo object
- Adds Photo reference to associated Artist object

### **Remove Artist Photo**
```
/api/artist/:artistID/photo/:photoID
```
- DELETE request
- Deletes Photo object
- Removes Photo reference on associated Artist object

### **Add Gallery Photo**
```
/api/gallery/:galleryID/photo
```
- POST request
- Creates Photo object
- Adds Photo reference to associated Artist and Gallery objects

### **Remove Gallery Photo**
```
/api/gallery/:galleryID/photo/:photoID
```
- DELETE request
- Deletes Photo object
- Removes Photo reference from associated Artist and Gallery objects

### **Add Listing Photo**
```
/api/listing/:listingID/photo
```
- POST request
- Creates Photo object
- Adds Photo reference to associated Artist, Gallery and Listing objects

### **Remove Listing Photo**
```
/api/listing/:listingID/photo/:photoID
```
- DELETE request
- Deletes Photo object
- Removes Photo reference from associated Artist, Gallery and Listing objects

## Artist Routes v. 0.0.5

### **Add Artist**
```
/api/artist
```
- POST request
- Creates an Artist object

### **Find Artist**
```
/api/artist/:artistID
```
- GET request
- Finds Artist object by artistID

### **Update Artist**
```
/api/artist/:artistID
```
- PUT request
- Updates Artist object located by artistID

### **Remove Artist**
```
/api/artist/:artistID
```
- DELETE request
- Removes Artist object located by artistID
- Removes all associated Gallery and Listing objects by artistID
- Removes all associated Photo objects by artistID

## Gallery Routes v. 0.0.5
### **Add Gallery**
```
/api/artist/:artistID/gallery
```
- POST request
- Creates a Gallery object
- Adds Gallery reference to associated Artist object

### **Find Gallery**
```
/api/artist/:artistID/gallery/:galleryID
```
- GET request
- Finds Gallery object by galleryID

### **Update Gallery**
```
/api/artist/:artistID/gallery/:galleryID
```
- PUT request
- Updates Gallery object located by galleryID

### **Remove Gallery**
```
/api/artist/:artistID/gallery/:galleryID
```
- DELETE request
- Removes Gallery object located by galleryID
- Removes all associated Listing objects by galleryID
- Removes all associated Photo objects by galleryID
- Removes Gallery reference from associated Artist object

## Listing Routes v. 0.0.5

### **Add Listing**
```
/api/gallery/:galleryID/listing
```
- POST request
- Creates a Listing object
- Adds Listing reference to associated Gallery and Artist objects

### **Find Listing**
```
/api/gallery/:galleryID/listing/:listingID
```
- GET request
- Finds Listing object by listingID

### **Update Listing**
```
/api/gallery/:galleryID/listing/:listingID
```
- PUT request
- Updates Listing object located by listingID

### **Remove Listing**
```
/api/gallery/:galleryID/listing/:listingID
```
- DELETE request
- Removes Listing object located by listingID
- Removes all associated Photo objects by listingID
- Removes Listing reference from associated Gallery and Artist objects
