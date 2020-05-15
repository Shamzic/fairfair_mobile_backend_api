

sendNotification = (id, expoPushToken) => {
  console.log("sendNotification "+id)
  console.log("sendNotification "+expoPushToken)
  ;(async () => {
      const expoPushTokenString = ""+expoPushToken;
      console.log(expoPushToken)
      const data = {
        "tokenArray": [expoPushTokenString],
        "body": "Vous avez une nouvelle mission ! :)",
        "data": { 
          "dataExample": "test"
        },
        "sound": true,
        "channelId": "mission",
        color: '#FFA500',
      };

      console.log("data: ", data)

      const config = {
        headers: {      
          "Content-type": "application/json",
          "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdC5xdWlvdXZyZS5jb21cL2FwaVwvYXJ0aXNhbnMubG9naW4iLCJpYXQiOjE1ODg2MDA5MjMsImV4cCI6MTYyMDEzNjkyMywibmJmIjoxNTg4NjAwOTIzLCJqdGkiOiI0Ulh1aGo4b1k2bmRPYjF0Iiwic3ViIjoxMDA2LCJwcnYiOiIzN2I0MTg2YzRhODhhMDE1MWE5ZDAwNDAzZTczZTY0YWQwNzU2NDdmIiwiaWQiOjEwMDYsInJvbGUiOiJhcnRpc2FucyJ9.skS8PR92k_YEwPcW3XLc6RNzb27IZHxbkyc1pAX1x5E",
          'Access-Control-Allow-Credentials': 'true',
          "Access-Control-Allow-Methods": "POST, GET",
          "Access-Control-Allow-Origin": "http://localhost:8000/"
        }
      };
      // 15.188.50.182
      const response = await axios.post('http://localhost:8000/notifications/mission', data, config
    );
  
    console.log(response)
  })() 
}