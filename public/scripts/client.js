/*
 * Client-side JS logic
 * jQuery is already loaded
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

  //prevent cross site scripting attacks
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
  //stretch - Form toggle
  const $composeTweet = $(".new-tweet");
  const $composeButton = $("#compose");
  const $textArea = $("#tweet-text");

  $composeButton.click(function(event) {
    event.preventDefault();
    $composeTweet.toggle("slow");
    $textArea.focus();
  });

  const $formSubmission = $('.tweet-form');
  $formSubmission.submit(function(event) {
    event.preventDefault();

    const url = "http://localhost:8080/tweets/";
    const type = "POST";
    const data = $(this).serialize();
    const tweetVal = $('#tweet-text').val();
    const wordLength = tweetVal.length;
    const maxLength = 140;
    //validation check for starting tweet with a space
    if (!tweetVal.replace(/\s/g, "").length) {
      $("#error").text("Tweet only contains spaces");
      $("#error").slideDown("fast", "linear");
      setTimeout(function() {
        $("#error").slideUp("fast", "linear");
      }, 4000);
    }
    //validation check for tweet being empty
    if (wordLength === 0) {
      $('#error').text("Tweet should not be blank");
      $("#error").slideDown("fast", "linear");
      setTimeout(function() {
        $("#error").slideUp("fast", "linear");
      }, 3000);
    }
    //validation check for exceeding character limit
    if (wordLength > maxLength) {
      $("#error").text("You have exceeded the character limit");
      $("#error").slideDown("fast", "linear");
      setTimeout(function() {
        $("#error").slideUp("fast", "linear");
      }, 3000);
    }
    //form submits when the tweet is present then resets textarea value and counter
    //validation check for only spaces in tweet
    if (wordLength <= maxLength && (tweetVal.replace(/\s/g, "").length)) {
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
      $(".counter").val(140);
    }
  });
});