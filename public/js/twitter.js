tweetButton = document.getElementById("tweet");
tweetContent = document.getElementById("tweetContent")

tweetButton.onclick = function(){
    window.location.href = "tweet?value=" + tweetContent.value;
}