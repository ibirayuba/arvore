// assets/js/submit-form.js
const form = document.getElementById('servico-form');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // evita duplo clique
  if (form.dataset.busy === '1') return;
  form.dataset.busy = '1';

  // botão (com ou sem id="enviar-btn")
  const btn = form.querySelector('#enviar-btn, button[type="submit"]');
  const originalText = btn ? btn.textContent : 'Enviar Anúncio';

  // feedback imediato
  if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
  if (mensagem) { mensagem.textContent = 'Enviando…'; mensagem.style.color = '#cbbbd6'; }

  // coleta campos
  const atendimentoValues = Array
    .from(form.querySelectorAll('input[name="atendimento"]:checked'))
    .map(el => el.value);

  const dados = {
    nome: form.nome.value,
    responsavel: form.responsavel?.value || '',
    categoria: form.categoria.value,
    descricao: form.descricao?.value || '',
    local: form.local?.value || '',
    contato: form.contato.value,
    email: form.email?.value || '',
    link: form.link?.value || '',
    atendimento: atendimentoValues.join(', ')
  };

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    let resposta;
    try { resposta = await res.json(); }
    catch { resposta = { message: res.ok ? 'Enviado com sucesso!' : 'Erro inesperado ao processar resposta do servidor.' }; }

    if (mensagem) {
      mensagem.textContent = resposta.message;
      mensagem.style.color = res.ok ? 'lightgreen' : 'red';
    }
    if (res.ok) {
      form.reset();
      if (typeof fetchServices === 'function') fetchServices();
    }
  } catch (err) {
    console.error(err);
    if (mensagem) {
      mensagem.textContent = 'Falha de rede. Tente novamente.';
      mensagem.style.color = 'red';
    }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = originalText; }
    form.dataset.busy = '0';

    setTimeout(() => {
      if (mensagem) { mensagem.textContent = ''; mensagem.style.color = ''; }
    }, 4000);
  }
});


/*document.getElementById('servico-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const atendimentoValues = Array.from(form.querySelectorAll('input[name="atendimento"]:checked')).map(el => el.value);

  const dados = {
    nome: form.nome.value,
    responsavel: form.responsavel.value || '',
    categoria: form.categoria.value,
    descricao: form.descricao.value || '',
    local: form.local.value || '',
    contato: form.contato.value,
    email: form.email.value || '',
    link: form.link.value || '',
    atendimento: atendimentoValues.join(', ')
  };

  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  let resposta;
  try {
    resposta = await res.json();
  } catch {
    resposta = { message: 'Erro inesperado ao processar resposta do servidor.' };
  }

  const mensagem = document.getElementById('mensagem');
  mensagem.textContent = resposta.message;
  mensagem.style.color = res.ok ? 'lightgreen' : 'red';

  if (res.ok) {
    form.reset();
  }

  if (typeof fetchServices === 'function') {
    fetchServices();
  }

  setTimeout(() => {
    mensagem.textContent = '';
    mensagem.style.color = '';
  }, 4000);
});

*/
