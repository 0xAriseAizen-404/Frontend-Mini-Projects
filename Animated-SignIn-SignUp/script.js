const wrapperEl = document.querySelector(".wrapper");
const signinConBtn = document.querySelectorAll(
  ".wrapper .form-container .btns-container .signin-btn"
);
const signupConBtn = document.querySelectorAll(
  ".wrapper .form-container .btns-container .signup-btn"
);
const signupLink = document.querySelector(
  ".wrapper .form-container.sign-in .footer span"
);
const signinLink = document.querySelector(
  ".wrapper .form-container.sign-up .footer span"
);
console.log(signinLink);
const animatedSignIn = () => {
  wrapperEl.classList.add("animated-signin");
  wrapperEl.classList.remove("animated-signup");
};
const animatedSignUp = () => {
  wrapperEl.classList.add("animated-signup");
  wrapperEl.classList.remove("animated-signin");
};

signupLink.addEventListener("click", animatedSignIn);
signinLink.addEventListener("click", animatedSignUp);
signinConBtn.forEach((btn) => btn.addEventListener("click", animatedSignUp));
signupConBtn.forEach((btn) => btn.addEventListener("click", animatedSignIn));

const formEl = document.querySelectorAll(".wrapper form");
formEl.forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  })
);
