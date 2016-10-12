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

**10/11/2016, 2:00pm**

    - From earlier today:

      - Elizabeth: Finished GET and POST route, tests failing.
        - Block: update to gallery and listing mocks
      - Lee/Max: Finished GET and POST and PUT routes for Gallery, many tests for both routes
        - Block: added userID to gallery and listing model/mocks
      - Claudia: ~ 1/2 through Photo model and tests
        - Block: duplication errors

    - Working till 5ish

      - Lee: DELETE working for Gallery Test/Routes, collaborate on Listing routes/tests
      - Max: get .populate working for simple GET requests, collaborate on Listing routes/tests
      - Elizabeth: Listing tests
      - Claudia: Finish the rest of Photo routes/tests

**10/12/2016, 10:00am**

  - From yesterday:

    - Elizabeth: Finished Listing Routes and Tests. Helped with merging and conflicts.
    - Lee: Gallery Router Tests completed, adding more tests. Refactored routes for Listing and Gallery.  
    - Max: Worked with Lee on Refactoring and Authorization. Worked on Populate for Listing and Gallery arrays. Handled token error for photo tests. Fixed POST requests for photos, working on DELETE.
    - Claudia: Worked on photo tests and routes. Was having trouble getting help with routes and hit a few blocks.
      - Block: photo route errors.

  - Working on until 1-ish

    - Lee: working on Gallery router tests and Listing router test. Adding validation to ensure that the same userID is the one in the test and making sure the router responds appropriately.
    - Elizabeth: finish merge conflicts, go through coveralls to find missed lines.
    - Max: finishing the Put and Delete tests for routes.
    - Claudia: Working with the instructors on blocks.

  **10/12/2016, 2:00pm**

    - From earlier today:

      - Elizabeth: handled merge conflicts and made notes from coverall on code that said where we weren't running lines.
      - Lee: Worked with
      - Max: Added photo routes and tests. fixed bearer-middleware and handled all the tests that were affected by that.
      - Claudia: researched stripe and updated README.md so that we know how the app works and what the commands and links will be.

    - Working on until 5-ish:

Listing-Delete method needs to delete it's reference from the corresponding gallery model.
Gallery-Delete method needs to delete it's reference from the corresponding artist model.
When we delete a Gallery we need to delete all associated listings at the same time.
When we delete an Artist, we need to delete all associated galleries and listings at the same time.
Write README.md file so that we have an introduction, instructions for setup and user instructions.
Devnotes need to be updated with current paths and versions.

      - Lee and Max: DELETE routes
      - Claudia: photo POST routes
      - Elizabeth: Devnotes
