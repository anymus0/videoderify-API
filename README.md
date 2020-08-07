# videoderify-API
This is the API for my video sharing platform: Videoderify 

You can find the [client here](https://github.com/anymus0/videoderify-client/)!

## Database access:
Set the enviroment variable **DB_URI** to your mongo connection string.
<br>Example: `DB_URI="mongodb+srv://username:password@cluster.mongodb.net/db_name?retryWrites=true&w=majority"`

## Persistent data
Every uploaded file will be stored in a directory named *media* in the project's root.

If you want to place this directory elsewhere, then you have to set the enviroment variable **MEDIA_DIR** to your desired path.
<br>Example: `MEDIA_DIR=/home/username/myMediaDir`

<br>Also note that you should probably set the right permissions to the media directory so the API will be able to access it.

## Port
You can also set the API server's port by creating the **PORT** env variable
<br>Example: `PORT=5000`

### TODOS: 
- ~~handle uploaded files from the client~~
- ~~expose API only to the client's domain / implement API access (API keys or something)~~ (use cors in web server)
- ~~write an endpoint that will serve a series' episodes <br>(each episode will be requested individually from the cleint, parameter will be the episode's number)~~
- ~~organise routes~~
- ~~save Serieses into a MongoDB database~~
- ~~better error handling & json responses~~
- calculate current and max storage capacity based on which drive the server is running on
