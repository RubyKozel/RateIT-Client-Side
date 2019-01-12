/** Init **/

const signin = document.getElementById('div_signin');
const confirm = document.getElementById('div_confirm');
const signup = document.getElementById('div_signup');

if(!localStorage.getItem("likesTrack"))
  localStorage.setItem("likesTrack", JSON.stringify({}));

console.log(localStorage.getItem("likesTrack"))  


document.getElementById('signup_nav').addEventListener('click', () => {
    show(signup);
    hide(signin);
    hide(confirm);
});

document.getElementById('signin_nav').addEventListener('click', () => {
    hide(signup);
    show(signin);
    hide(confirm);
});

document.getElementById('signup_btn').addEventListener('click', () => {
    show(signup);
    hide(signin);
    hide(confirm);
});

document.getElementById('signin_btn').addEventListener('click', () => {
    hide(signup);
    show(signin);
    hide(confirm);
});

document.getElementById('signin_to_dashboard').addEventListener('click', () => {
    hide(signup);
    show(signin);
    hide(confirm);
});

window.onscroll = () => {
    if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
        document.getElementById("go_to_top").style.display = "block";
    } else {
        document.getElementById("go_to_top").style.display = "none";
    }
}

document.getElementById("go_to_top").addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
});

/** Register Section **/

const register_url = "http://localhost:8083/playground/users";
let form;


document.getElementById("register_to_confirm").addEventListener("click", async () => {
    form = {
        email: document.getElementById("email_up").value,
        username: document.getElementById("username_up").value,
        avatar: document.getElementById("avatar_up").value,
        role: "Guest"
    };
    
    if (!form.email || !form.username || !form.avatar) {
        alert("All field are required !");
        return;
    }

    const response = await fetch(register_url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });

    const resultJson = await response.json();
    
//    if (!resultJson['avatar'] || !resultJson['email'] || !resultJson['userName']) {
//        alert("All field are required !");
//        return;
//    }
    
    if (!resultJson['email']) {
        alert("User already exists !");
        return;
    }

    toggle(signup);
    toggle(confirm);

});

document.getElementById("signup_to_signin").addEventListener("click", () => {
    toggle(signup);
    toggle(signin);
});

/** Confirm Section **/

const confirm_url = "http://localhost:8083/playground/users/confirm/2019A.Kagan";

document.getElementById('confirm_to_dashboard').addEventListener("click", async () => {
    const email = document.getElementById('email_confirm').value;
    const code = document.getElementById('code_confirm').value;

    try {
        const response = await fetch(confirm_url + '/' + email + '/' + code);
        const resultJson = await response.json();

        if (!resultJson['email']) {
            alert(resultJson['message']);
        } else {
          alert("Confirmation Successfull");
          toggle(confirm);
          toggle(signin);
        }

    } catch (error) {
        alert(error);
    }
});

/** Login Section **/

const login_url = "http://localhost:8083/playground/users/login/2019A.Kagan";

document.getElementById('signin_to_dashboard').addEventListener("click", async () => {
    const email = document.getElementById('email_in').value;
    const res = await fetch(login_url + '/' + email);
    const resJson = await res.json();
    console.log(resJson);
    console.log(resJson['points']);
    const username = resJson['userName'];
    if (username) {
        alert("Welcome back, " + username);
        localStorage.setItem("playground", resJson['playground']);
        localStorage.setItem("email", email);
        localStorage.setItem("userName", username);
        localStorage.setItem("points", resJson['points']);
        localStorage.setItem("role", resJson['role']);
        localStorage.setItem("avatar", resJson['avatar']);

        let emailObject = JSON.parse(localStorage.getItem("likesTrack"));
        if(!emailObject[email]){
          emailObject[email] = [[],[]];
          localStorage.setItem("likesTrack", JSON.stringify(emailObject));
        }

        location.href = 'elements_home.html';
    } else {
        const errorMessage = resJson['message'];
        alert(errorMessage);
    }
});

document.getElementById("signin_to_signup").addEventListener("click", () => {
    toggle(signin);
    toggle(signup);
});

/** helpers **/

const show = (elem) => {
    elem.classList.add('is-visible');
    elem.style.display = 'block';
    const height = elem.scrollHeight + 'px';
    elem.style.display = '';
    elem.style.height = height;
    window.setTimeout(() => elem.style.height = '', 350);
};

const hide = function (elem) {
    elem.style.height = elem.scrollHeight + 'px';
    window.setTimeout(() => elem.style.height = '0', 1);
    window.setTimeout(() => elem.classList.remove('is-visible'), 350);
};

const toggle = (elem, timing) => {
    if (elem.classList.contains('is-visible')) hide(elem);
    else show(elem);
};
