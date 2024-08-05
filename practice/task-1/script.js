document.addEventListener("DOMContentLoaded", function () {
  const openModalBtn = document.querySelector(".button--open-modal");
  const modal = document.querySelector(".modal");
  const closeModalBtn = document.querySelector(".button--close");
  const form = document.querySelector(".form");
  const submitBtn = document.querySelector(".button--submit");
  const logoInput = document.getElementById("logo");
  const logoPreview = document.getElementById("logo-preview");
  const removeLogoBtn = document.querySelector(".form__upload-remove");
  const removeLoad = document.querySelector(".form__upload-load");

  // открытие модального окна
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // закрытие модального окна
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
    resetForm();
  });

  // маска для телефона
  const phoneInput = document.getElementById("phone");
  const phoneMask = IMask(phoneInput, {
    mask: "+{7} 000 000-00-00",
  });

  // валидация формы
  form.addEventListener("input", validateForm);

  // загрузка логотипа
  logoInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        logoPreview.style.backgroundImage = `url(${e.target.result})`;
        logoPreview.textContent = "";
        removeLoad.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      resetLogoPreview();
    }
    validateForm();
  });

  // клик на крестик
  removeLogoBtn.addEventListener("click", function () {
    resetLogoPreview();
    validateForm();
  });

  // отправка формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData);
    console.log(formObject);
    resetForm();
    modal.style.display = "none";
  });

  // сброс превью логотипа
  function resetLogoPreview() {
    logoPreview.style.backgroundImage = "none";
    logoPreview.style.backgroundImage = "url(./image/bg.png)";
    logoPreview.innerHTML = "Выберите <br> файл";
    logoInput.value = "";
    removeLoad.style.display = "block";
  }

  // валидация формы
  function validateForm() {
    const requiredFields = [document.getElementById("org-name"), document.getElementById("phone"), document.getElementById("email"), document.getElementById("direction"), document.getElementById("manager"), logoInput];

    const isValid = requiredFields.every((field) => field.value.trim() !== "");
    submitBtn.disabled = !isValid;
  }

  // сброс формы
  function resetForm() {
    form.reset();
    resetLogoPreview();
    validateForm();
  }
});
