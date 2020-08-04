# videoderify-API
This is the API for my video sharing platform: Videoderify 

You can find the [client here](https://github.com/anymus0/videoderify-client/)!

## Database access:
Create a **.env** file in the project root and provide your mongo connection string to the **DB_URI** variable. <br>Example: `DB_URI=mongodb+srv://username:password@cluster.mongodb.net/db_name?retryWrites=true&w=majority`

### TODOS: 
- ~~handle uploaded files from the client~~
- expose API only to the client's domain / implement API access (API keys or something)
- ~~write an endpoint that will serve a series' episodes <br>(each episode will be requested individually from the cleint, parameter will be the episode's number)~~
- ~~organise routes~~
- ~~save Serieses into a MongoDB database~~
- better error handling & json responses
- calculate current and max storage capacity based on which drive the server is running on
