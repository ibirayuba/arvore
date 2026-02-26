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
    const {
      nome,
      responsavel,
      servico,
      descricao,
      localidade,
      endereco,
      contato,
      email,
      link,
      atendimento
    } = req.body;

    console.log('📦 Dados recebidos:', req.body);

    const { data, error } = await supabase.from('servicos').insert([{
      nome,
      responsavel,
      servico,
      descricao,
      localidade,
      endereco,
      contato,
      email,
      link,
      atendimento
    }])
      .select();

    if (error) {
      console.error('🔥 Erro do Supabase:', error);
      return res.status(500).json({ message: 'Erro ao salvar',
                                    supabase: {
                                      message: error.message,
                                      details: error.details,
                                      hint: error.hint,
                                      code: error.code
                                    } 
      });
    }

    return res.status(200).json({ message: 'Serviço salvo com sucesso!', data });
  } catch (err) {
    console.error('🚨 Erro inesperado:', err);
    return res.status(500).json({ message: 'Erro inesperado', error: err.message });
  }
};



