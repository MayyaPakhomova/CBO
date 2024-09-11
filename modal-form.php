<?php
include $_SERVER['DOCUMENT_ROOT'] . '/head.php';
include $_SERVER['DOCUMENT_ROOT'] . '/header.php';
?>


<main style="height: 100vh; padding-top: 150px;">
  <section>
    <div class="container">
      <div class="modal-form">
        <div class="modal-form__left">
          <img src="assets\img\modal-form\modal-form.webp" alt="modal-form-photo">
        </div>
        <div class="modal-form__right">
          <h2>Please fill out the form below</h2>
          <form action="">
            <div class="modal-form__inner">
              <label class="modal-form__label">Name</label>
              <input class="modal-form__input" placeholder="Enter your name">
            </div>
            <div class="modal-form__inner">
              <label class="modal-form__phone modal-form__label">PHONE</label>
              <input class="modal-form__input" type="tel" placeholder="+7 (999) 999-99-99">
            </div>
            <div class="modal-form__inner">
              <label class=" modal-form__label">DeTAILS</label>
              <textarea class="modal-form__textarea" placeholder="Your comments"></textarea>
            </div>
            <div class="modal-form__police">
              <label class="modal-form-checked">
                <input type="checkbox" class="modal-form-checked__checkbox">
                <span class="modal-form-checked__checkmark"><i class="fa fa-check"></i></span>

                <span class="modal-form-checked__text">I agree with terms of</span><a href="/privacy-policy" class="modal-form-checked__link">Privacy Policy</a>
              </label>
            </div>

            <button class="modal-form__button">SUBMIT</button>
          </form>
        </div>
      </div>

    </div>
  </section>
</main>

<?php
include $_SERVER['DOCUMENT_ROOT'] . '/footer.php';
?>