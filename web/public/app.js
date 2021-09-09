$('#navbar').load('navbar.html');
$('#footer').load('footer.html');


const users = JSON.parse(localStorage.getItem('users')) || [];


  $('#login').on('click', function() {
    const username = $('#username').val();
    const password = $('#password').val();
    const exist = users.find(user => user.username === username);
    const exists = users.find(user => user.password === password);
    if (exist == undefined)
    {
       $("#message").text("User does not Exist.");
    }
    else
    {
       if(exists == undefined)
       {
           $("#message").text("Incorect Password.");
       }
   
       else
       {
           localStorage.setItem('isAuthenticated', JSON.stringify(true));
            location.href = '/home1';
       }
    }
   });

$('#register').on('click', function() {
 const username = $('#username').val();
 const password = $('#password').val();
 const confirm = $('#confirm').val();
 const exists = users.find(user => user.username === username);
 if (exists == undefined)
 {
     if(password == confirm)
     {
         users.push({username, password, confirm})
         localStorage.setItem('users', JSON.stringify(users));
         location.href = '/login';
     }
     else
     {
        $("#message").text("Passwords does not matches.");
     }
 }
 else
 {
    $("#message").text("User Already Exists.");
 }
});


    
