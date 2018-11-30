1)Index.js-The index.js file has been used to program a custom webhook which connects to a service for dialogflowfulfillment and sends the JSON response to the firebase database which stores the data or the input command.


2)Key-services.json- has the api key ,google crendentials,client tokens and SHA-256 key for storing and retrieving the firebase records.(Firebase-identifiers)

3)Packages.json- has all the packages which are used for configuring the latest firebase packages for the index.js script

4)Configure_firebase_url.py- has the python script for client which parses the input commands sent from the server and checks the strings for specific words such as "create file"
or "shutdown computer" and then uses os subprocesses to carry out the specific functions.It checks the firebase database every 5 seconds for any probable input command for any user and then executes the command and deletes the record from the firebase.