const menuToggle = document.querySelector('#menu-toggle'),
    menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', e => {
    e.preventDefault();
    menu.classList.toggle('visible');
});

const loginElem = document.querySelector('.login'),
    loginForm = document.querySelector('.login-form'),
    emailInput = document.querySelector('.login-email'),
    passwordInput = document.querySelector('.login-password'),
    loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user'),
    userNameElem = document.querySelector('.user-name'),
    sidebarNav = document.querySelector('.sidebar-nav'),
    buttonNewPost = document.querySelector('.button-new-post');


const listUsers = [
    {
        id: '01',
        email: 'lala@mail.com',
        password: '123456',
        displayName: 'MaksJS'
    },
    {   
        id: '02',
        email: 'rara@mail.com',
        password: '1234567',
        displayName: 'Rara'
    }
];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        const user = this.getUser(email);
        if(user && user.password === password){
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut() {

    },
    signUp(email, password, handler) {
        if(!this.getUser(email)){
            const user = {email, password, displayName:email.replace(/\@.*/, '')};
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким email уже зарегистрирован');
        }
    },
    getUser(email){
        return listUsers.find(item => item.email === email);
    },
    authorizedUser(user) {
        this.user = user;
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log(user)
    if(user) {
        loginElem.style.display = 'none';
        userElem.style.display = 'flex';
        userNameElem.textContent = user.displayName;
        sidebarNav .style.display = 'block';
        buttonNewPost.style.display = 'flex';
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
});

loginSignup.addEventListener('click', e => {
    e.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
})
