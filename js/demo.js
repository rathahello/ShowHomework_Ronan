$(document).ready(function(){
  var countError = [];
  $('button').on('click',function(){
    var name = $('#name').val();
    var age = $('#age').val();
    var nickname = $('#nickname').val();
    //name cannot empty and cannot only number
    var isNameValid = name != "" && isNaN(name);
    if(isNameValid){
      borderGreen('name');
      countError[0] = 0;
    }else{
      borderRed('name');
      countError[0]=1;
    }

    //Age should be int number positive
    var isAgeValid = age != "" && age > 0 && !isNaN(age) && age == parseInt(age) && age.length <= 3;
    if(isAgeValid){
      borderGreen('age');
      countError[1] = 1;
    }else{
      borderRed('age');
      countError[1] = 2;
    }

    // Nickname must be container 1 uppercase and at least 9 chars
    var atleast9chars = nickname.length >=9 && nickname != "";
    var atLeast1Uppercase = false;
    for(let i=0; i<nickname.length; i++){
      var chars = nickname.charAt(i)
      // borderGreen('nickname');
     if(isNaN(chars)){
       var isUppercase = chars.toUpperCase() == chars;
       atLeast1Uppercase = atLeast1Uppercase || isUppercase;
     }
    }
    var isNicknameValid = atleast9chars && atLeast1Uppercase;
    if(isNicknameValid){
      borderGreen('nickname');
      countError[2] = 2;
    }else{
      borderRed('nickname');
      countError[2] = 3;
    }

    //all information corrent 
    var allValid = isNicknameValid && isAgeValid && isNameValid;
    if(allValid){
      showSuccess();
    }else{
      showMessageError(countError);
    }
  });
});

//border Green 
var borderGreen = (elementId) => {
  $("#" + elementId).addClass('border-success').removeClass('border-danger');
}
//border Red
var borderRed = (elementId) => {
  $("#" + elementId).addClass('border-danger').removeClass('border-success');
}
//show message success
var showSuccess = () => {
  var success = "";
  success += `
  <div class="alert alert-success">
  <strong>success!</strong>
  </div>
  `;
  $('#message').append(success);
}
//show message error
var errorSMS = ['Name is empty!', 'Age must be number','nickname shall contain 1 uppercase and 9 chars'];
var showMessageError = (errors) => {
//   for(let i=0;i<error.length;i++){
  //     console.log(error[i]);
  //   }
  var showError = "";
//name error
  if(errors[0] == 1){
    showError += "- " +  errorSMS[0] + "<br>";
  }else{
    showError += "";
  }
//age error
  if(errors[1] == 2){
    showError += "- " + errorSMS[1] + "<br>";
  }else{
    showError += "";
  }
  //nickname error
  if(errors[2] == 3){
    showError += "- " + errorSMS[2] + "<br>";
  }else{
    showError += "";
  }
  
  $('#message').html(
    ` 
    <div class="alert alert-danger">
    <strong>${showError}</strong>
    </div>
    
    `
  );
}