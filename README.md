
cd app...
meteor -s settings.json


Photos call configuration (not working)

    this.getPhotos = () => {
      Meteor.call('fetchAcessToken', (error, accessToken) => { 
        var config = {
          headers:  { 
            'ContentType': 'application/json',
            'Authorization': 'bearer ' + accessToken
          }
        }
        var bodyParams = {
          "pageSize":"100"
        }
        return axios.post(
          'https://photoslibrary.googleapis.com/v1/mediaItems:search',
          bodyParams,
          config
        )
        .then(function (resp) {console.log(resp)})
        .catch(function (error) {console.log(error)})
      })    
    }


    scopes:
            "https://www.googleapis.com/auth/photoslibrary.readonly",
            "https://www.googleapis.com/auth/drive.photos.readonly",
            "https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata"