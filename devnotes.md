## MODELS ##
_______________________________________________________________

## User Model v. 0.0.1
**Creates a user**
- Username (required, unique)
- Email (required, unique)
- Password (required)
- findHash (unique, made for the user)

## Photo Model v. 0.0.2
**Creates a photo with reference to AWS Bucket**
- Image URI ()
- Key ()
- Alt ()
- Artist ID ()
- User ID ()

## Artist Model v. 0.0.3
**Creates an artist profile given user id and password**
- Username (required)
- First name
- Last name
- Email
- City
- Phone
- Zip
- About
- Date Joined
- Galleries [array]
- User ID
- Photo ID

## Gallery Model v. 0.0.1
**Creates a gallery for specified artist**
- Gallery Name
- Description
- Date Created
- Category (validated string)
- User ID
- Profile ID
- Listings (array)

## Listing Model v. 0.0.2
**Creates a listing for in specified gallery**
- Title
- Description
- Category
- Date Created
- User ID
- Profile ID
- Gallery ID


# Auth Routes v. 0.0.1


- Signup - POST request - creates a new user

- Login - GET request - takes input of a user name and password, and finds a user

# Photo Routes v. 0.0.1

# Artist Routes v. 0.0.1
- POST request - /api/artist - creates a new artist

- GET requests
  - /api/artist/:artistID - gets an artist profile by artist ID

- PUT request - /api/artist/:artistID - updates an artist profile at specific ID

- DELETE request - /api/artist/:artistID - deletes an artist profile at specific ID

# Gallery Routes v. 0.0.2
- POST request - /api/artist/:artistID/gallery - creates a new gallery, pushes new gallery ID to artist galleries array

- GET request - /api/gallery/:galleryID - get a specific gallery by id

# Listing Routes v. 0.0.1
