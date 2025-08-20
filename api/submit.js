const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { nome, servico, localidade, atendimento, contato, link } = req.body;

    console.log('📦 Dados recebidos:', req.body);

    const { error } = await supabase.from('servicos').insert([{
      nome,
      servico,
      localidade,
      atendimento,
      contato,
      link
    }]);

    if (error) {
      console.error('🔥 Erro do Supabase:', error);
      return res.status(500).json({ message: 'Erro ao salvar', error });
    }

    return res.status(200).json({ message: 'Serviço salvo com sucesso!' });
  } catch (err) {
    console.error('💥 Erro inesperado:', err);
    return res.status(500).json({ message: 'Erro inesperado', error: err.message });
  }
};
