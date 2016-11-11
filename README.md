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
