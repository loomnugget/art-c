## MODELS ##
_______________________________________________________________

# User Model v. 0.0.1
- Creates a user
- Username
- Email
- Password
- findHash

# Photo Model v. 0.0.1
- Creates a photo with reference to AWS Bucket
- Image URI
- Key
- Alt

# Artist Model v. 0.0.2
- Creates an artist profile given user id and password
- User IDs
- First name
- Last name
- Email
- City
- Phone
- Zip
- Photo ID
- About
- Date Joined

# Gallery Model v. 0.0.1
- Creates a gallery for specified artist
- Gallery Name
- Description
- Date Created
- Category (validated string)
- User ID
- Profile ID
- Listing IDs

# Listing Model v. 0.0.1
- Creates a listing for in specified gallery
- Title
- Description
- Category
- Date Created
- Profile ID
- Gallery ID


# Auth Routes v. 0.0.1
- Signup - POST request - creates a new user

- Login - GET request - takes input of a user name and password, and finds a user

# Photo Routes v. 0.0.1

# Artist Routes v. 0.0.1

# Gallery Routes v. 0.0.1

# Listing Routes v. 0.0.1
