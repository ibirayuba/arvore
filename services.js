// servicos.js
const SUPABASE_URL = 'https://vymiwjhqbqzdydbdzqhu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_e0Qxx98pQTMkQsgzCL-QWA_vv0Mp3Hq';

async function carregarServicos() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/servicos?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  const servicos = await response.json();
  const container = document.getElementById('lista-servicos');

  if (!container) return;
  container.innerHTML = '';

  servicos.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'bg-white text-[#280a32] p-4 rounded shadow';
    card.innerHTML = `
      <h4 class="text-xl font-bold">${item.nome}</h4>
      <p><strong>Serviço:</strong> ${item.servico}</p>
      <p><strong>Local:</strong> ${item.localidade}</p>
      <p><strong>Atendimento:</strong> ${item.atendimento}</p>
      <p><strong>Contato:</strong> ${item.contato}</p>
      ${item.link ? `<p><a href="${item.link}" class="text-[#386b14] underline" target="_blank">Ver mais</a></p>` : ''}
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', carregarServicos);
