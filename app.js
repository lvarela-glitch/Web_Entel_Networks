(() => {
  const form = document.getElementById('dimensionForm');
  const message = document.getElementById('formMessage');
  const button = form.querySelector('button[type="submit"]');

  function showMessage(text, type) {
    message.textContent = text;
    message.className = `form-message visible ${type}`;
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function checkedValues(name) {
    return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map(input => input.value);
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    message.className = 'form-message';
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    data.attractions = checkedValues('attractions');
    data.bot_goals = checkedValues('bot_goals');
    data.submitted_at = new Date().toISOString();
    data.form_version = 'mazalife-cx-v1';

    if (data.website) {
      form.reset();
      showMessage('Gracias. Recibimos tu información.', 'success');
      return;
    }

    const endpoint = window.MAZALIFE_FORM_CONFIG?.endpoint?.trim();
    if (!endpoint) {
      showMessage('El formulario todavía no está conectado para guardar respuestas. Contacta a Entel Networks para activar el envío.', 'error');
      return;
    }

    button.disabled = true;
    button.querySelector('span:first-child').textContent = 'Enviando…';
    try {
      const payload = new URLSearchParams({ payload: JSON.stringify(data) });
      await fetch(endpoint, { method: 'POST', mode: 'no-cors', body: payload });
      form.reset();
      showMessage('Gracias. Recibimos tu información y la usaremos para preparar la propuesta de Mazalife.', 'success');
    } catch (error) {
      showMessage('No se pudo enviar la información. Revisa tu conexión e inténtalo de nuevo.', 'error');
    } finally {
      button.disabled = false;
      button.querySelector('span:first-child').textContent = 'Enviar información';
    }
  });
})();
