# Artsy
- “Artsy is a global-local art market, spotlighting local artists to both customers and other artists alike.”

## MODELS ##
_______________________________________________________________

# User Model
- username
- email
- password
- findHash

# Photo Model
- imageURI
- key
- userIDs
- Alt

# Artist Model
- userIDs
- first name
- last name
- email
- city
- phone
- zip
- photo ID
- about
- date joined (date)

# Gallery Model
- Profile ID
- Category (validated string)
- Gallery Name
- Description
- Created on (date)
- UserID
- listingIDs [pop]

# Listing Model
- title
- description
- Category
- photo[pop]
- created on (date)
- profile ID
- gallery ID
