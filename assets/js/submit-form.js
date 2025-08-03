// assets/js/submit-form.js
document.getElementById('servico-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const atendimentoValues = Array.from(form.querySelectorAll('input[name="atendimento"]:checked')).map(el => el.value);

  const dados = {
    nome: form.nome.value,
    servico: form.servico.value,
    localidade: form.localidade.value,
    atendimento: atendimentoValues.join(', '),
    contato: form.contato.value,
    link: form.link.value || ''
  };

  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  const resposta = await res.json();
  const mensagem = document.getElementById('mensagem');
  mensagem.textContent = resposta.message;
  mensagem.style.color = res.ok ? 'lightgreen' : 'red';

  if (res.ok) {
    form.reset();
    fetchServices(); // recarrega os cards, se essa função estiver no services.js
  }
});
