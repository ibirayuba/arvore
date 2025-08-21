document.getElementById('servico-form').addEventListener('submit', async (e) => {
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
