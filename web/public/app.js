
const USER_URL = `http://localhost:5001/api`;
const DEVICE_URL = `http://localhost:5000/api`;
const PRESCIPTION_URL = `http://localhost:5002/api`;
const CONTACT_URL = `http://localhost:5004/api`;
const MQTT_URL = 'http://localhost:5005/send-command';
const activeuser = JSON.parse(localStorage.getItem('activeuser')) || [];
const activeaccess = JSON.parse(localStorage.getItem('activeaccess')) || [];
const activeName = JSON.parse(localStorage.getItem('activeName')) || [];
const activeMobile = JSON.parse(localStorage.getItem('activeMobile')) || [];

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

  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });

  $.get(`${CONTACT_URL}/contact`)
  .then(response => {
    var count = 1;
    response.forEach(contact => {
      if (contact.email == activeuser[0] || contact.email == undefined) {
        $('#contacts tbody').append(`
          <tr>
            <td>${count++}</td>
            <td>${contact.name}</td>
            <td>${contact.content}</td>
            <td>${contact.number}</td>
          </tr>`
        );
      }
    })

  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });


function Sign_In() {
  var login = 0;
  const username = $('#username').val();
  const password = $('#password').val();
  $.get(`${USER_URL}/users`)
    .then(response => {

      response.forEach(user => {

        if (user.email == username && user.pass == password) {
          console.log('matched')
          login = 1;
          activeuser[0] = username;
          activeaccess[0] = user.access;
          activeMobile[0] = user.mobile;
          activeName[0]= user.name;
          localStorage.setItem('activeuser', JSON.stringify(activeuser));
          localStorage.setItem('activeaccess', JSON.stringify(activeaccess));
          localStorage.setItem('activeName', JSON.stringify(activeName));
          localStorage.setItem('activeMobile', JSON.stringify(activeMobile));
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

  var device_exist = 0;
  var emailMatch = 0;
  const email = $('#email').val();
  const deviceid = $('#deviceid').val();
  const devicename = $('#devicename').val();
  const devicelocation = $('devicelocation').val();
  $.get(`${DEVICE_URL}/devices`)
    .then(response => {
      response.forEach(device => {
          if (device.deviceid == deviceid) {
            device_exist = 1;
          }
        
      });

      if (device_exist == 1) {
        alert('Device ID alredy Exists. Assign different Id!!');
        location.href = '/deviceregister';
      }
      else {


        const body = {
          email,
          deviceid,
          devicename,
          devicelocation
        };

        $.post(`${DEVICE_URL}/devices`, body)
          .then(response => {
            location.href = '/home1';
          })
          .catch(error => {
            console.error(`Error: ${error}`);
          });
      }
    })
}

function MedRegister() {

  var emailMatch = 0;
  const email = $('#patientID').val();
  const prescription = $('#prescription').val();
  const time = $('#time').val();
  $.get(`${PRESCIPTION_URL}/prescription`)
    .then(response => {
      $.get(`${USER_URL}/users`)
      .then(response => {
  
        response.forEach(user => {
  
          if (user.email == email) {
            emailMatch = 1;
          }
        });
        if (emailMatch == 1) {
          const body = {
            email,
            prescription,
            time
          };
    
          $.post(`${PRESCIPTION_URL}/prescription`, body)
            .then(response => {
              location.href = '/home1';
            })
            .catch(error => {
              console.error(`Error: ${error}`);
            });
  
        }
        else {
          alert(email + ' is not registered!!');
          location.href = '/prescription';
        }
      })
    })
}

function EmergencyContact() {

  var emailMatch = 0;
  const email = $('#email').val();
  const name = $('#name').val();
  const content = $('#content').val();
  const number = $('#number').val();
  $.get(`${CONTACT_URL}/contact`)
    .then(response => {
      $.get(`${USER_URL}/users`)
      .then(response => {
  
        response.forEach(user => {
  
          if (user.email == email) {
            emailMatch = 1;
          }
        });
        if (emailMatch == 1) {
          const body = {
            email,
            name,
            content,
            number
          };
    
          $.post(`${CONTACT_URL}/contact`, body)
            .then(response => {
              location.href = '/home1';
            })
            .catch(error => {
              console.error(`Error: ${error}`);
            });
  
        }
        else {
          alert(email + ' is not registered!!');
          location.href = '/contact';
        }
      })
    })
}

function SendCommand()
{
  const deviceId = $('#email').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { deviceId, command })
  .then(response => {
  location.href = '/';
      })
}

function DeleteDevice()
{
  const deviceId = $('#deviceid').val();
  
  $.post(DELETE_URL, { deviceId })
  .then(response => {
  location.href = '/';
      })
}

