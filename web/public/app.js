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

   function SignUp() {

      var user_exist =0;
      const email = $('#username').val();
      const name = $('#name').val();
      const mobile = $('#mobile').val();
      const pass = $('#password').val();
      const confirm = $('#confirm').val();
      const access = $('#access').val();
      $.get(`${USER_URL}/users`)
      .then(response => {
  
          response.forEach(user => {
  
          if (user.email == email) {
  
              user_exist = 1;
  
          }
      });
      if(user_exist == 1)
      {
          alert('Email already Exist. SIgn In');
          location.href = '/signin';
      }
      else
      {
      const body = {
          email,
          name,
          mobile,
          pass,
          access
        };
      
        $.post(`${USER_URL}/users`, body)
        .then(response => {
          location.href = '/signin';
        })
        .catch(error => {
          console.error(`Error: ${error}`);
        });
      }
  })
  .catch(error => {
      console.error(`Error: ${error}`);
    });
      
  
  }

function DeviceRegister() {

   var device_exist =0;
   const deviceid = $('#deviceid').val();
   const devicename = $('#devicename').val();
   const devicelocation = $('#devicelocation').val();
   $.get(`${DEVICE_URL}/devices`)
   .then(response => {
       response.forEach(device => {


       if (device.deviceid == deviceid) {
           device_exist = 1;

       }
   });
   if(device_exist == 1)
   {
       alert('Device ID alredy Exists. Assign different Id!!');
           location.href = '/device-register';
   }
   else{

   
   const body = {
       deviceid,
       devicename,
       devicelocation
     };
   
     $.post(`${DEVICE_URL}/devices`, body)
     .then(response => {
       location.href = '/landing-page';
     })
     .catch(error => {
       console.error(`Error: ${error}`);
     });
   }
})
   
   
}
    
