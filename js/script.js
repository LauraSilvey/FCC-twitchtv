var users = ["brunofin", "cretetion", "ESL_SC2", "freecodecamp", "habathcx", "noobs2ninjas", "OgamingSC2", "RobotCaleb"];

function newBox(id, name){
  var newP = document.createElement("p");
  var newHeader = document.createElement("h3");
  var newDiv = document.createElement("div");
  var rowDiv = document.createElement("div");
  var newImg = document.createElement("img")
      
  $(id).append(newDiv);
  $(newDiv).addClass("container well");
  $(newDiv).append(rowDiv);
  $(rowDiv).addClass("row " + name + "-row");
  $(rowDiv).append(newImg, newHeader, newP);
  $(newImg).addClass(name + "logo col-sm-3 img-circle img-small");
  $(newHeader).addClass(name + " col-sm-4");
  $(newP).addClass(name + "details col-sm-5 text-center");
};


function allUsers(){
  users.forEach(function(user){
    var url = "https://api.twitch.tv/kraken/streams/" + user + "?callback=?";
    $.getJSON(url, function(data){
      if(data.stream === Object(data.stream)){
        newBox("#onlineResults", user);
        $(".well").addClass("online-results");
        $("." + user + "logo").attr("src", data.stream.channel.logo);
        $("." + user).html(user);
        $("." + user + "-row").wrap('<a href="' + data.stream.channel.url + '" target="blank" />');
        $("." + user + "details").html(data.stream.channel.status);
      }else if(data.stream === null){
        $.getJSON(data._links.channel, function(data){
          newBox("#offlineResults", user);
          $("." + user + "logo").attr("src", data.logo);
          $("." + user).html(user);
          $("." + user + "details").html("offline");
          $("." + user + "-row").wrap('<a href="https://www.twitch.tv/' + user + '" target="blank" />')
        });
      }else{
        newBox("#accountClosed", user);
        $("." + user + "logo").attr("src", "https://www.theyearinpictures.co.uk/images//image-placeholder.png");
        $("." + user).html(user);
        $("." + user + "details").html("account closed");
      }
    });
  });  
};



$(document).ready(function() {
  allUsers();

});
