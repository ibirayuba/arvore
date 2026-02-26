// assets/js/services.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://svcwivctwogwpzhspboq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Y3dpdmN0d29nd3B6aHNwYm9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMDY5NzQsImV4cCI6MjA4NzU4Mjk3NH0.SRLONSOKmCG9Kx1o8N2xQDgBAuNlMguwsUQSMh7XZWE';
const supabase = createClient(supabaseUrl, supabaseKey);

const container = document.getElementById('services-list');

function buildContactHref(contato) {
  if (!contato) return '';
  const c = contato.trim();

  // telefone
  if (/^\+?\d[\d\s()-]{6,}$/.test(c)) {
    const phone = c.replace(/[^\d+]/g, '');
    return `tel:${phone}`;
  }

  // email
  if (c.includes('@') && !c.startsWith('http')) return `mailto:${c}`;

  // instagram @user
  if (c.startsWith('@')) return `https://instagram.com/${c.slice(1)}`;

  // url
  if (/^https?:\/\//i.test(c)) return c;

  // instagram.com/...
  if (c.includes('instagram.com')) return `https://${c}`;

  return '';
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

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

  container.innerHTML = data.map(service => {
    const contato = service.contato || '';
    const contactHref = buildContactHref(contato);

    return `
      <div class="w-100pc md-w-50pc">
        <div class="br-8 p-5 m-5 bg-purple-lightest-10 hover-scale-up-1 ease-300">
          <div class="inline-block bg-purple purple-lightest br-3 px-4 py-1 mb-4 fs-s4 uppercase">
            ${escapeHtml(service.servico || 'Serviço')}
          </div>

          <div class="purple-lightest fw-600 fs-m1 break-words">
            <strong>${escapeHtml(service.nome || '')}</strong><br>
            ${escapeHtml(service.descricao || '')}<br>
            ${escapeHtml(service.localidade || '')}<br>
            ${escapeHtml(service.endereco || '')}<br>
            <span class="opacity-50">${escapeHtml(service.atendimento || '')}</span>

            ${contato ? `
              <div class="contact-row">
                ${contactHref
                  ? `<a class="contact-link" href="${escapeHtml(contactHref)}" target="_blank" rel="noopener noreferrer">
                      ${escapeHtml(contato)}
                    </a>`
                  : `<span class="contact-link">${escapeHtml(contato)}</span>`
                }
                <button type="button" class="copy-btn" data-copy="${escapeHtml(contato)}">
                  <i class="fa-regular fa-clone"></i>
                </button>
              </div>
            ` : ''}

            ${service.responsavel ? `<div class="opacity-30 mt-2">${escapeHtml(service.responsavel)}</div>` : ''}
          </div>

          ${service.link ? `
            <a href="${escapeHtml(service.link)}" target="_blank" class="mt-5 button bg-black fs-s3 white no-underline">
              Ver trabalho
            </a>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// listener único pra copiar
document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;

  const txt = btn.getAttribute('data-copy') || '';
  try {
    await navigator.clipboard.writeText(txt);
    const old = btn.textContent;
    btn.textContent = 'Copiado!';
    setTimeout(() => (btn.textContent = old), 1200);
  } catch (err) {
    console.error(err);
  }
});

document.addEventListener('DOMContentLoaded', fetchServices);
window.fetchServices = fetchServices;