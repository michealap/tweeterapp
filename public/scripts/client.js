/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend($newTweet);
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
  ${escape(tweet.content.text)}
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
  

  const loadTweets = function() {
    const url = "http://localhost:8080/tweets";
    const type = "GET";
    $.ajax({
      url: url,
      type: type,
      complete: function(data) {
        renderTweets(data.responseJSON);
      }
    });
  };

  loadTweets();

  const $formSubmission = $('.tweet-form');
  $formSubmission.submit(function(event) {
    event.preventDefault();

    const url = "http://localhost:8080/tweets/";
    const type = "POST";
    const data = $(this).serialize();
    const wordLength = $('#tweet-text').val().length;
    const maxLength = 140;
    //validation check for tweet being empty
    if (wordLength === 0) {
      $("#tweet-label").text("Blank tweet");
      $(".tweet-form").addClass("error-message");
      setTimeout(function() {
        $("#tweet-label").text("What are you humming about?");
        $(".tweet-form").removeClass("error-message");
      }, 2000);
    }
    //validation check for exceeding character limit
    if (wordLength > maxLength) {
      $("#tweet-label").text("You have exceeded the character limit");
      $(".tweet-form").addClass("error-message");
      setTimeout(function() {
        $("#tweet-label").text("What are you humming about?");
        $(".tweet-form").removeClass("error-message");
      }, 2000);
    }
    //form submits when the tweet is present then resets textarea value and counter
    if (wordLength < maxLength) {
      $.ajax({
        type: type,
        url: url,
        data: data,
        success: function(data) {
          console.log('success');
        }
      })
        .then(loadTweets);
      $('#tweet-text').val('');
      $(".counter")[0].innerHTML = 140;
    }
  });
});





