// assets/js/services.js

// Exibe os serviços usando a chave pública, sem permitir inserts
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const supabaseUrl = 'https://vymiwjhqbqzdydbdzqhu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bWl3amhxYnF6ZHlkYmR6cWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDAxNTUsImV4cCI6MjA2OTY3NjE1NX0.CpVUh-3IDSgkO7N9YjYyBZayTviDjlxsgdUAj9cmhUE';
const supabase = createClient(supabaseUrl, supabaseKey);

const container = document.getElementById('services-list');

async function fetchServices() {
  const { data, error } = await supabase
    .from('servicos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar serviços:', error);
    if (container) container.innerHTML = '<p class="white">Não foi possível carregar os serviços.</p>';
    return;
  }

  if (!data || data.length === 0) {
    if (container) container.innerHTML = '<p class="white">Nenhum serviço cadastrado ainda.</p>';
    return;
  }

  if (!container) return;

  container.innerHTML = data.map(service => `
    <div class="w-100pc md-w-50pc">
      <div class="br-8 p-5 m-5 bg-teal-lightest-10 pointer hover-scale-up-1 ease-300">
        <div class="inline-block bg-teal teal-lightest br-3 px-4 py-1 mb-4 fs-s4 uppercase">
          ${service.servico || 'Serviço'}
        </div>
        <div class="teal-lightest fw-600 fs-m1">
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

document.addEventListener('DOMContentLoaded', fetchServices);
window.fetchServices = fetchServices;
