1. Game and student api are both in one project, separated by different folders.
2. game and student share one connection and one .env file which stores information about
each API database url and server port number.
3. the server file (index.js) resides at the root of each folder, it opens the database connection
by passing in the dburl for that application from the .env file.

4. To run the student API, using node cli type in 'node student' (student is the folder)
5. To run the game API, type in 'node game'
6. For student, to create a new student including address, sample object is shown below
{
    "name":"Dennis M",
    "gpa":3.8,
    "address":{
        "street":"1100  N Street",
        "city":"Iowa City",
        "state":"IOWA",
        "zip":54998
        }
}

7. Students base path: http://localhost:4100/api/students
8. Games base path: http://localhost:3330/api/games