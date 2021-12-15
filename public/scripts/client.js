/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  const renderTweets = function(tweets) {
    // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').append($newTweet);
    }
  };

  const createTweetElement = function(tweet) {
    const time = timeago.format(tweet.created_at);
    let $tweet = $(`<article class="tweet-body">
  <header class="tweet-profile">
  <div class= "tweet-name">
  <img src=${tweet.user.avatars} height="50px" width="50px">
  <p>${tweet.user.name}</p>
  </div>
  <div class="tweet-handle">${tweet.user.handle}
  </div> 
  </header>      
  <div class="tweet-text">
  ${tweet.content.text}
  </div>     
  <footer class="tweet">
  <div>
  ${time}       
  </div>
  <div class="tweet-icon">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`);
    return $tweet;
  };

  renderTweets(data);
});
