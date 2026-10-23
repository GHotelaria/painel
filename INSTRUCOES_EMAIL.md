# Configurar o envio de cotações por e-mail

O painel foi preparado com o botão **Enviar para reservas por e-mail**. Para o envio funcionar, é necessário configurar uma conta no EmailJS. Isso evita colocar senha do Gmail dentro do código público do GitHub Pages.

## 1. Criar o serviço de e-mail
1. Entre em https://www.emailjs.com/ e crie uma conta.
2. No painel do EmailJS, abra **Email Services** e conecte o serviço de e-mail que será usado para enviar as mensagens.
3. Confirme a conta e teste o serviço conforme as instruções do EmailJS.

## 2. Criar o template
1. Abra **Email Templates** e crie um template.
2. Configure o destinatário como `{{to_email}}`.
3. Configure o assunto como `{{subject}}`.
4. No corpo do e-mail, inclua `{{quote_message}}`. Exemplo:

   Olá, equipe de reservas!

   Nova cotação gerada no painel:

   {{quote_message}}

5. Salve o template.

## 3. Inserir os identificadores no painel
No arquivo `script.js`, localize `EMAILJS_CONFIG` e substitua:
- `COLOQUE_SUA_PUBLIC_KEY` pela Public Key do EmailJS;
- `COLOQUE_SEU_SERVICE_ID` pelo Service ID do serviço conectado;
- `COLOQUE_SEU_TEMPLATE_ID` pelo Template ID criado.

O destinatário já está definido como `condominiosolarbz@gmail.com`.

## 4. Publicar
Salve os arquivos alterados e envie-os ao repositório GitHub para atualizar o GitHub Pages. Faça primeiro um teste com uma cotação fictícia e confirme se o e-mail chega e se os links ficam copiáveis.

## Importante
- Não coloque a senha da conta Gmail no `script.js`.
- A Public Key do EmailJS é feita para uso no navegador, mas configure limites/restrições e proteção antiabuso disponíveis no EmailJS.
- O painel continuará gerando a cotação localmente. O envio só será ativado depois que os três identificadores forem configurados.
