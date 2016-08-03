var users = ["cretetion", "ESL_SC2", "freecodecamp", "habathcx", "noobs2ninjas", "OgamingSC2", "RobotCaleb"];

function newBox(id, newClass){
  var newP = document.createElement("p");
  var newHeader = document.createElement("h3");
  var newDiv = document.createElement("div");
  var rowDiv = document.createElement("div");
  var newImg = document.createElement("img")
      
  $(id).append(newDiv);
  $(newDiv).addClass("container well");
  $(newDiv).append(rowDiv);
  $(rowDiv).addClass("row");
  $(rowDiv).append(newImg, newHeader, newP);
  $(newImg).addClass(newClass + "logo col-sm-3 img-circle img-small");
  $(newHeader).addClass(newClass + " col-sm-3");
  $(newP).addClass(newClass + "details col-sm-6 text-right");
};


function allUsers(){
  users.forEach(function(user){
    var url = "https://api.twitch.tv/kraken/streams/" + user + "?callback=?";
    $.getJSON(url, function(data){
      if(data.stream === Object(data.stream)){
        newBox("#onlineResults", user);
        $(".well").addClass("onlineResults");
        $("." + user + "logo").attr("src", data.stream.channel.logo);
        $("." + user).html(user);
        $("." + user + "details").html(data.stream.channel.status);
      }else{
        $.getJSON(data._links.channel, function(data){
          newBox("#offlineResults", user);
          $("." + user + "logo").attr("src", data.logo);
          $("." + user).html(user);
          $("." + user + "details").html("offline");
        });
      }
    });
  });  
};


$(document).ready(function() {
  allUsers();

});
