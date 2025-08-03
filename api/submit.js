// api/submit.js
//import { createClient } from '@supabase/supabase-js';

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://vymiwjhqbqzdydbdzqhu.supabase.co';
const supabaseKey = 'sb_publishable_e0Qxx98pQTMkQsgzCL-QwA_vv0Mp3Hq';
const supabase = createClient(
  process.env.supabaseUrl,
  process.env.supabaseKey
);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro');
  const mensagem = document.getElementById('mensagem');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const nome = formData.get('nome');
    const servico = formData.get('servico');
    const localidade = formData.get('localidade');
    const contato = formData.get('contato');
    const link = formData.get('link');

    const atendimentos = form.querySelectorAll('input[name="atendimento"]:checked');
    const atendimento = Array.from(atendimentos).map(a => a.value).join(', ');

    const { error } = await supabase.from('servicos').insert([
      { nome, servico, localidade, atendimento, contato, link }
    ]);

    if (error) {
      mensagem.textContent = 'Erro ao cadastrar: ' + error.message;
      mensagem.classList.add('text-red');
    } else {
      mensagem.textContent = 'Serviço cadastrado com sucesso!';
      mensagem.classList.remove('text-red');
      mensagem.classList.add('text-green');
      form.reset();
    }
  });
});
