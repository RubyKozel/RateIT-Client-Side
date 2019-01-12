const email = localStorage.getItem('email');
const userPlayground = localStorage.getItem('playground');
let url = `http://localhost:8083/playground/elements/${userPlayground}/${email}` + localStorage.getItem('extra_url');
const type = localStorage.getItem('type');

document.getElementById('type').placeholder = type;
document.getElementById('type').disabled = true;
document.title = localStorage.getItem('title');
document.getElementById('headline').innerHTML = localStorage.getItem('title');
document.getElementById('submit_btn').value = localStorage.getItem('button');

document.getElementById('submit_btn').addEventListener('click', async () => {
  try {
    const name_value = document.getElementById('name').value;
    const x_value = document.getElementById('x').value;
    const y_value = document.getElementById('y').value;

    let more_values_json = document.getElementById('more').value;
    let attributes;
    if(more_values_json == "" || !more_values_json){
      attributes = {};
    } else {
      attributes = JSON.parse(more_values_json);
    }

    const form = {
        playground: '2019A.Kagan',
        location: {
          x: x_value,
          y: y_value
        },
        name: name_value,
        type: type,
        attributes: attributes,
        creatorPlayground: userPlayground,
        creatorEmail: email
      };

    const response = await fetch(url, {
                method: localStorage.getItem('method'),
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });

    // Alowing only one messaging board          
    if(localStorage.getItem('button') == 'Create'){
      const responseJson = await response.json();

      if (type == 'Messaging Board'){
        localStorage.setItem('board_id', responseJson['id']);
      }
    }


    alert("Creation successful");

    location.href='elements_home.html';

  } catch (error){
    alert(error);
  }
});

document.getElementById('cancel_btn').addEventListener('click', () => {
    location.href = 'elements_home.html';
});

document.getElementById('reset_btn').addEventListener('click', () => {
    document.getElementById('new_element_form').reset();
});