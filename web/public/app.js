$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const USER_URL = `http://localhost:5001/api`;

$.get(`${DEVICE_URL}/devices`)
  .then(response => {
    var count = 1;
    response.forEach(device => {
      if (device.email == activeuser[0]) {
      $('#devices tbody').append(`
          <tr>
          <td>${count++}</td>
            <td>${device.deviceid}</td>
            <td>${device.devicename}</td>
            <td>${device.devicelocation}</td>
          </tr>`
      );
      }
    })
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });


$.get(`${PRESCIPTION_URL}/prescription`)
  .then(response => {
    var count = 1;
    response.forEach(prescript => {
      if (prescript.email == activeuser[0]) {
        $('#prescriptions tbody').append(`
          <tr>
            <td>${count++}</td>
            <td>${prescript.prescription}</td>
            <td>${prescript.time}</td>
          </tr>`
        );
      }
    })


        if (user.email == username && user.pass == password) {
          console.log('matched')
          login = 1;
          activeuser[0] = username;
          activeaccess[0] = user.access;
          localStorage.setItem('activeuser', JSON.stringify(activeuser));
          localStorage.setItem('activeaccess', JSON.stringify(activeaccess));
        }
      });
      if (login == 1) {
        location.href = '/home1';

      }
      else {
        alert('User not found. Sign up!!');
        location.href = '/registration';
      }
    })


}

function SignUp() {

  var user_exist = 0;
  var id = 0
  // var pass_match = 0;
  const email = $('#username').val();
  const name = $('#name').val();
  const mobile = $('#mobile').val();
  const pass = $('#password').val();
  const confirm = $('#confirm').val();
  const access = $('#access').val();
  $.get(`${USER_URL}/users`)
    .then(response => {

      response.forEach(user => {

        id++;
        if (user.email == email) {

          user_exist = 1;
          console.log(pass + " " + confirm);


        }

      });
      if (user_exist == 1) {
        alert('Email already Exist. Sign In');
        location.href = '/login';
      }

      else {
        const body = {
          id,
          email,
          name,
          mobile,
          pass,
          access
        };

        $.post(`${USER_URL}/users`, body)
          .then(response => {
            location.href = '/login';
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


