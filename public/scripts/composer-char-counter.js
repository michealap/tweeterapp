$(document).ready(function() {
  const $newTweetCount = $('#tweet-text');
  $newTweetCount.on('input', function() {
    let currentCount = 140;
    const counter = $(this).closest('.new-tweet').find('.counter');
    //closest goes up the tree to parent node then finds counter
    //find method returns an array with one element
    currentCount -= $(this).val().length; //you can also use this.value.length to update the current counter
    counter[0].value = currentCount;
    //refers to tweet text
    if (currentCount >= 0) {
      counter.removeClass('red');
    }
    if (currentCount < 0) {
      counter.addClass('red');
    }
  });
});

