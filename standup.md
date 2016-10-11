##Standup Notes:

**10/10/2016, 11am**

    - Do you have deployment?
        YES
    - Do you have travis?
        YES; passing with a simple test.

    - What's everyone working on today until 1-ish?

        - All: Work on user model and get done.

        - Max: Working on middleware--Basic-Auth Middleware, Bearer-auth middleware. Once done, will collaborate the POST and GET requests for the auth route.

        - Claudia/Liz: Building out the other models. 80% done by 1pm. Will pair program on that.

**10/10/2016, 1:30pm**

    - Liz and Claudia made all of the models.
        - Blockers? Ensuring that the photo IDs and references for each thing are properly aligned

    -  Max got the middlewares done and post and get route for the auth.

    - Lee got the auth router tests passing for 200s. Also created the ./lib/ helper files and user mocks.

    Misc:
        - We don't need photos required for gallery, artist and listing.
        - BONUS: Create a route to check if a username has been taken. It would do a findOne. e.g. /api/useravailable POST and you send back a 204 for success, 409 for duplicate (RED). This POST request would trigger on every single keystroke.

    - What's everyone working on today until 5pm?

        - All: Try to get as many of the test and routes done with basic testing by end of day so we can jump into making lots of tests tonight or tomorrow.

        - Max: Will finish writing the mocks. 100% mocks.

        - Lee: Auth-router testing and start writing tests for artists, galleries and listings. 50% on artist routes and tests.

        - Elizabeth: Tests and routes for artists, galleries and listings.

        - Claudia: Tests and routes for artists, galleries and listings.

**10/10/2016, 11:00pm**

    Question: Why are two tests failing on Liz's machine for Mongo-related errors and not on others?


**10/11/2016, 11:00am**

    - From yesterday:

      - Lee: finished most of Artist routes/tests
      - Claudia: AWS, photo artist/ POST
      - Max: Finished all the mocks, helped Claudia/Elizabeth with AWS upload.
      - Elizabeth: AWS, photo artist/ POST, mongo error fix (duplicates)

    - Working on till 1pm

      - Lee: working on Gallery Routes/Tests
      - Claudia: working on Photo Router/Tests
      - Max: helping Lee with Gallery Routes/Tests
      - Elizabeth: Listing Routes
