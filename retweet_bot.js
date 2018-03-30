//Install and require the twit dependenci
let Twit = require('twit');
//Require the api keys from another file, for safe keeping
const api = require('./secret.js');

//Create a Twit object using the secrets
let T = new Twit({
  consumer_key: api.consumer_key,
  consumer_secret: api.consumer_secret,
  access_token: api.access_token,
  access_token_secret: api.access_token_secret
});

//Id of some twitter accounts (News that post alot)
let users = ['16142493', '759251', '28785486', '428333', '2097571'];

//We are telling the stream to follow the the users
let stream = T.stream('statuses/filter', { follow: users });

//The function is run every time the stream gets a tweet
stream.on('tweet', function(tweet) {
  if (users.indexOf(tweet.user.id_str) > -1) {
    console.log('Tweet from: ' + tweet.user.name);
    T.post('statuses/retweet/:id', { id: tweet.id_str }, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
  }
});
