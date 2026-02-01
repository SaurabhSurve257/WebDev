console.log("Portfolio Loaded Successfully!");

// Replace the FORM_ENDPOINT value with your Formspree endpoint URL (e.g., https://formspree.io/f/your-form-id)
const FORM_ENDPOINT = "https://formspree.io/f/your-form-id";

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  const submitBtn = contactForm.querySelector('.primary-btn');
  const resetBtn = document.getElementById('resetBtn');

  function clearErrors() {
    contactForm.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  }

  function validate() {
    clearErrors();
    let valid = true;
    const checks = [
      ['name','Please enter your name.'],
      ['email','Please enter a valid email.'],
      ['reason','Please add a short reason.'],
      ['message','Please enter a message.']
    ];

    checks.forEach(([id,msg]) => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        const err = el.parentElement.querySelector('.field-error');
        if (err) err.textContent = msg;
        valid = false;
      } else if (id === 'email') {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(el.value.trim())) {
          el.parentElement.querySelector('.field-error').textContent = 'Enter a valid email address.';
          valid = false;
        }
      }
    });

    return valid;
  }

  resetBtn?.addEventListener('click', () => { contactForm.reset(); clearErrors(); formStatus.style.display = 'none'; });

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formStatus.style.display = 'block';
    formStatus.classList.remove('success','error');
    formStatus.textContent = '';

    const payload = {
      name: document.getElementById('name').value.trim(),
      _replyto: document.getElementById('email').value.trim(),
      subject: document.getElementById('reason').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        formStatus.textContent = '✅ Thanks! Your message has been sent. I will get back to you soon.';
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        formStatus.textContent = '⚠️ Oops! There was a problem sending your message. Please try again later.';
        formStatus.classList.add('error');
        const error = await res.json().catch(() => null);
        console.error('Form send error:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
      formStatus.textContent = '⚠️ Network error. Please try again later.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      setTimeout(() => { formStatus.style.display = 'none'; }, 10000);
    }
  });
}
