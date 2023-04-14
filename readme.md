# Open Study College TechTest

Project objective is to create a complete RESTFUL Api with endpoints containing

1. Get all courses
2. Get specific course
3. Get collection of catagories
4. Get specific collection
5. Allow new users to signup
6. Allow users to login
7. Allow a new course to be added
8. Update a course
9. Delete a course

## Content

Inside the project are 4 folders marked **Authenticator** this holds the JWT Token authenticator using the JWT library for nodejs. <br>
Next we have **Models**, this contains the two schema models used within the REST Api one model for *Users* & another for *courses* each model have their own schema designs. <br>
We have **Routes** next, this where the endpoints for all the requests for both users and courses are stored. Certain routes are protect by authentication. <br>
Finally we have **Tests**, this is portion covers automated testing suite on certain end points within the API. See screenshot below of tests suit ran. <br>

![Alt text](/tests.png?raw=true "Optional Title")