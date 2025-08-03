// assets/js/services.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://vymiwjhqbqzdydbdzqhu.supabase.co';
const supabaseKey = 'sb_publishable_e0Qxx98pQTMkQsgzCL-QWA_vv0Mp3Hq';
const supabase = createClient(supabaseUrl, supabaseKey);

const container = document.getElementById('services-list');

async function fetchServices() {
  const { data, error } = await supabase.from('servicos').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar serviços:', error);
    container.innerHTML = '<p class="white">Não foi possível carregar os serviços.</p>';
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = '<p class="white">Nenhum serviço cadastrado ainda.</p>';
    return;
  }

  container.innerHTML = data.map(service => `
    <div class="w-100pc md-w-50pc">
      <div class="br-8 p-5 m-5 bg-indigo-lightest-10 pointer hover-scale-up-1 ease-300">
        <div class="inline-block bg-indigo indigo-lightest br-3 px-4 py-1 mb-4 fs-s4 uppercase">
          ${service.servico || 'Serviço'}
        </div>
        <div class="indigo-lightest fw-600 fs-m1">
          <strong>${service.nome}</strong><br>
          ${service.localidade}<br>
          <span class="opacity-50">${service.atendimento}</span><br>
          <span class="opacity-30">${service.contato}</span>
        </div>
        ${service.link ? `<a href="${service.link}" target="_blank" class="mt-5 button bg-black fs-s3 white no-underline">Ver trabalho</a>` : ''}
      </div>
    </div>
  `).join('');
}

fetchServices();
