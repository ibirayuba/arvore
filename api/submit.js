// api/submit.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, servico, localidade, atendimento, contato, link } = req.body;

  const { error } = await supabase.from('servicos').insert([{
    nome,
    servico,
    localidade,
    atendimento,
    contato,
    link
  }]);

  if (error) {
    return res.status(500).json({ message: 'Erro ao salvar', error });
  }

  return res.status(200).json({ message: 'Serviço salvo com sucesso!' });
}
