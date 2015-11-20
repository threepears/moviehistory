define(["q", "jquery", "firebase"], function(Q, $, firebase) {
  
  return function (email, password, thisUser) {

    console.log("email", email, "password", password, thisUser);
    var ref = new Firebase("https://originalidea.firebaseio.com/");
    ref.createUser({
      email: email,
      password: password
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
            break;
          default:
            alert("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $.ajax({ url: "https://originalidea.firebaseio.com/userprofiles.json",
        method: "POST",
        data: JSON.stringify(thisUser) });
      }
    });
  };
}); //--end define



