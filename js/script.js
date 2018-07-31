var link = document.querySelector(".contacts-button");
var popup = document.querySelector(".modal-window");
var close = popup.querySelector(".modal-close-button");
var username = popup.querySelector("[name=username]");
var email = popup.querySelector("[name=email]");
var message = popup.querySelector("[name=message]");
var form = popup.querySelector("form");

var isStorageSupport = true;
var storageUsername = "";
var storageEmail = "";

try {
    storageUsername = localStorage.getItem("username");
    storageEmail = localStorage.getItem("email");
} catch (err) {
    isStorageSupport = false;
}

var openPopUp = function (evt) {
    evt.preventDefault();
    popup.classList.add("modal-show");
    if (storageUsername && storageEmail) {
        username.value = storageUsername;
        email.value = storageEmail;
        message.focus();
    } else {
        username.focus();
    }
};

link.addEventListener("click", openPopUp);

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 13) {
    openPopUp(evt);
  }
});

close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove("modal-error");
      }
    }
});

form.addEventListener("submit", function (evt) {
    if (!username.value || !email.value || !message.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.offsetWidth = popup.offsetWidth;
        popup.classList.add("modal-error");
    } else {
        if (isStorageSupport) {
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        }
    }
});

