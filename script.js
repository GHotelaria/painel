// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {

    // =================================================
    // DADOS E CONFIGURAÇÕES
    // =================================================

    // URLs das pousadas (equivalente ao dicionário Python)
    const pousadas = {
        "POUSADA CENTRO CLASS": "http://hotels.cloudbeds.com/connect/208581#/calendar",
        "POUSADA CASA CENTRO": "http://hotels.cloudbeds.com/connect/207758#/calendar", 
        "POUSADA CENTRO UP": "http://hotels.cloudbeds.com/connect/209202#/calendar",
        "SOLAR JOÃO FERNANDES": "http://hotels.cloudbeds.com/connect/239462#/calendar",
       
    };

    // Endereços das pousadas
    const enderecos = {
        "POUSADA CENTRO CLASS": "R. Rui Barbosa, 08 - Centro, A. dos Búzios - RJ",
        "POUSADA CASA CENTRO": "R. Rui Barbosa, 12 - Centro, A. dos Búzios - RJ", 
        "POUSADA CENTRO UP": "R. Rui Barbosa, 229 A - Centro, Triângulo A. dos Búzios - RJ",
        "SOLAR JOÃO FERNANDES": " Rua São Cristóvão, R. João Fernandes, 16, Armação dos Búzios - RJ"
    };

    // Tipos de quarto por categoria
    const tiposQuarto = {
        "POUSADA": ["Duplo Standard", "Triplo"],
        "JOAO_FERNANDES": ["Duplo", "Triplo", "Quadruplo", "Sextuplo"]
    };

    // Templates de mensagem dos lofts por idioma
    const templatesMensagemLofts = {
        'Português': `👋 Olá! Tudo bem? Somos seus anfitriões da G Hotelaria Brasil durante sua estadia em Búzios.
Vemos que você tem uma reserva no SOLAR JOÃO FERNANDES!

🎒 A QUE HORAS POSSO ENTRAR?
O check-in é a partir das 14h, sem exceções.

👉 COMO CHEGO?
https://www.google.com/maps/place/22%C2%B045'03.8%22S+41%C2%B052'40.8%22W/@-22.751049,-41.880578,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.751049!4d-41.8780031?hl=pt-BR&entry=ttu
O complexo está localizado na Rua São Cristóvão, 16, no bairro João Fernandes.

🏡 QUAL É O MEU APARTAMENTO?
O apartamento reservado para você é o número {num}.

🔑 COMO ENTRO?
A propriedade conta com um cofre mecânico para guardar chaves!
Para acessar:
1️⃣ Abaixe a tampa do cofre.
2️⃣ Insira os 4 dígitos: *0816*.
3️⃣ Abra o cofre, retire a chave e abra a porta.
4️⃣ Após entrar, devolva a chave no cofre e, por segurança, altere os números.

📶 TEM WIFI?
- Rede: Solar João Fernandes (três redes disponíveis, mesma senha).
- Senha: solarbuzios.

🏊🏼‍♀️ HORÁRIO DA PISCINA:
Até as 22h.

💳 PAGAMENTO:
Pago no primeiro dia. Aceitamos débito, crédito, transferência ou dinheiro.

Muito obrigado! Estamos à disposição e em contato!`,

        'Español': `👋 ¡Hola! ¿Cómo estás? Somos tus anfitriones de G Hotelaria Brasil durante tu estadía en Búzios.
Vemos que tienes una reserva en SOLAR JOÃO FERNANDES.

🎒 ¿A QUÉ HORA PUEDO ENTRAR?
El check-in es a partir de las 14:00, sin excepciones.

👉 ¿CÓMO LLEGO?
https://www.google.com/maps/place/22%C2%B045'03.8%22S+41%C2%B052'40.8%22W/@-22.751049,-41.880578,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.751049!4d-41.8780031?hl=es&entry=ttu
El complejo está ubicado en Rua São Cristóvão, 16, barrio João Fernandes.

🏡 ¿CUÁL ES MI APARTAMENTO?
El apartamento reservado para ti es el número {num}.

🔑 ¿CÓMO ENTRO?
La propiedad cuenta con una caja mecánica para llaves.
Para acceder:
1️⃣ Baja la tapa de la caja.
2️⃣ Ingresa los 4 dígitos: *0816*.
3️⃣ Abre la caja, retira la llave y abre la puerta.
4️⃣ Tras entrar, devuelve la llave y por seguridad cambia el código.

📶 ¿HAY WIFI?
- Red: Solar João Fernandes (tres redes disponibles, misma clave).
- Contraseña: solarbuzios.

🏊🏼‍♀️ HORARIO DE LA PISCINA:
Hasta las 22:00.

💳 PAGO:
Se realiza el primer día. Aceptamos débito, crédito, transferencia o efectivo.

¡Muchas gracias! Quedamos a tu disposición y en contacto.`,

        'English': `👋 Hello! How are you? We are your hosts from G Hotelaria Brasil during your stay in Búzios.
We see you have a reservation at SOLAR JOÃO FERNANDES.

🎒 WHAT TIME CAN I CHECK IN?
Check-in starts at 2:00 PM, no exceptions.

👉 HOW DO I GET THERE?
https://www.google.com/maps/place/22%C2%B045'03.8%22S+41%C2%B052'40.8%22W/@-22.751049,-41.880578,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.751049!4d-41.8780031?hl=en&entry=ttu
The complex is located at Rua São Cristóvão, 16, João Fernandes neighborhood.

🏡 WHICH APARTMENT DO I HAVE?
The reserved apartment for you is number {num}.

🔑 HOW DO I ENTER?
The property has a mechanical safe for keys.
To access:
1️⃣ Lift the safe cover.
2️⃣ Enter the 4-digit code: *0816*.
3️⃣ Open the safe, take the key and open the door.
4️⃣ After entering, return the key and for security change the code.

📶 IS THERE WIFI?
- Network: Solar João Fernandes (three networks available, same password).
- Password: solarbuzios.

🏊🏼‍♀️ POOL HOURS:
Available until 10:00 PM.

💳 PAYMENT:
Due on arrival day. We accept debit, credit, transfer or cash.

Thank you very much! We are at your disposal and in touch.`,

        'Italiano': `👋 Ciao! Come stai? Siamo i tuoi host di G Hotelaria Brasil durante il tuo soggiorno a Búzios.
Hai una prenotazione al SOLAR JOÃO FERNANDES.

🎒 A CHE ORA POSSO FARE IL CHECK-IN?
Il check-in è dalle 14:00, senza ecceções.

👉 COME ARRIVO?
https://www.google.com/maps/place/22%C2%B045'03.8%22S+41%C2%B052'40.8%22W/@-22.751049,-41.880578,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-22.751049!4d-41.8780031?hl=it&entry=ttu
Il complesso si trova in Rua São Cristóvão, 16, quartiere João Fernandes.

🏡 QUAL È IL MIO APPARTAMENTO?
L'appartamento riservato per te è il numero {num}.

🔑 COME POSSO ENTRARE?
La proprietà dispone di una cassaforte meccanica per le chiavi.
Per accedere:
1️⃣ Solleva il coperchio della cassaforte.
2️⃣ Inserisci il codice a 4 cifre: *0816*.
3️⃣ Apri la cassaforte, prendi la chiave e apri la porta.
4️⃣ Dopo l'ingresso, riponi la chiave e per sicurezza cambia il codice.

📶 WIFI:
- Rete: Solar João Fernandes (tre reti disponibili, stessa password).
- Password: solarbuzios.

🏊🏼‍♀️ ORARIO DELLA PISCINA:
Fino alle 22:00.

💳 PAGAMENTO:
Saldo da pagare il giorno dell'arrivo. Accettiamo debito, credito, bonifico o contanti.

Grazie mille! Siamo a tua disposizione e in contatto.`
    };

    // Dicionários de tradução para cotações
    const mesesMap = {
        'janeiro': '01', 'fevereiro': '02', 'março': '03', 'abril': '04', 'maio': '05', 'junho': '06',
        'julho': '07', 'agosto': '08', 'setembro': '09', 'outubro': '10', 'novembro': '11', 'dezembro': '12',
        'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04', 'mai': '05', 'jun': '06',
        'jul': '07', 'ago': '08', 'set': '09', 'out': '10', 'nov': '11', 'dez': '12'
    };

    const nomesPousadasMap = {
        'POUSADA CENTRO CLASS': {
            'Português': 'POUSADA CENTRO CLASS',
            'Español': 'POSADA CENTRO CLASS', 
            'English': 'CENTRO CLASS INN',
            'Italiano': 'LOCANDA CENTRO CLASS'
        },
        'POUSADA CASA CENTRO': {
            'Português': 'POUSADA CASA CENTRO',
            'Español': 'POSADA CASA CENTRO',
            'English': 'CASA CENTRO INN', 
            'Italiano': 'LOCANDA CASA CENTRO'
        },
        'POUSADA CENTRO UP': {
            'Português': 'POUSADA CENTRO UP',
            'Español': 'POSADA CENTRO UP',
            'English': 'CENTRO UP INN',
            'Italiano': 'LOCANDA CENTRO UP'
        },
        'SOLAR JOÃO FERNANDES': {
            'Português': 'SOLAR JOÃO FERNANDES',
            'Español': 'SOLAR JOÃO FERNANDES', 
            'English': 'SOLAR JOÃO FERNANDES',
            'Italiano': 'SOLAR JOÃO FERNANDES'
        }
    };

    const tiposQuartoMap = {
        'Duplo Standard': {
            'Português': 'Duplo Standard',
            'Español': 'Doble Estándar',
            'English': 'Standard Double',
            'Italiano': 'Doppia Standard'
        },
        'Duplo': {
            'Português': 'Duplo',
            'Español': 'Doble', 
            'English': 'Double',
            'Italiano': 'Doppia'
        },
        'Triplo': {
            'Português': 'Triplo',
            'Español': 'Triple',
            'English': 'Triple',
            'Italiano': 'Tripla'
        },
        'Quadruplo': {
            'Português': 'Quadruplo',
            'Español': 'Cuádruple',
            'English': 'Quadruple', 
            'Italiano': 'Quadrupla'
        },
        'Quíntuplo': {
            'Português': 'Quíntuplo',
            'Español': 'Quíntuple',
            'English': 'Quintuple',
            'Italiano': 'Quintupla'
        },
        'Sextuplo': {
            'Português': 'Sextuplo',
            'Español': 'Séxtuple',
            'English': 'Sextuple',
            'Italiano': 'Sestupla'
        }
    };

    const labelsIdiomas = {
        'Português': {
            noite: 'noite',
            noites: 'noites', 
            pessoa: 'pessoa',
            pessoas: 'pessoas',
            cafe: '❤️ Café da manhã incluído.',
            checkin: 'Check-in',
            checkout: 'Check-out',
            diarias: 'Diárias',
            valor: 'Valor Total'
        },
        'Español': {
            noite: 'noche',
            noites: 'noches',
            pessoa: 'persona', 
            pessoas: 'personas',
            cafe: '❤️ Desayuno incluido.',
            checkin: 'Check-in',
            checkout: 'Check-out',
            diarias: 'Noches',
            valor: 'Valor Total'
        },
        'English': {
            noite: 'night',
            noites: 'nights',
            pessoa: 'guest',
            pessoas: 'guests',
            cafe: '❤️ Breakfast included.',
            checkin: 'Check-in',
            checkout: 'Check-out', 
            diarias: 'Nights',
            valor: 'Total Value'
        },
        'Italiano': {
            noite: 'notte',
            noites: 'notti',
            pessoa: 'ospite',
            pessoas: 'ospiti',
            cafe: '❤️ Colazione inclusa.',
            checkin: 'Check-in',
            checkout: 'Check-out',
            diarias: 'Notti',
            valor: 'Valore Totale'
        }
    };

    // =================================================
    // ELEMENTOS DO DOM
    // =================================================

    const paineisContainer = document.getElementById('pousadas-grid');
    const cotacaoPousadaSelect = document.getElementById('cotacao-pousada');
    const cotacaoQuartoSelect = document.getElementById('cotacao-quarto');
    const loftsBotoesContainer = document.getElementById('lofts-botoes');
    const btnProcessarCotacao = document.getElementById('btn-processar-cotacao');
    const btnCopiarCotacao = document.getElementById('btn-copiar-cotacao');
    const btnCopiarLofts = document.getElementById('btn-copiar-lofts');
    const resultadoCotacao = document.getElementById('resultado-cotacao');
    const resultadoLofts = document.getElementById('resultado-lofts');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // =================================================
    // FUNÇÕES UTILITÁRIAS
    // =================================================

    // Função para mostrar toast de notificação
    function mostrarToast(mensagem, tipo = 'success') {
        toastMessage.textContent = mensagem;
        toast.className = `toast ${tipo}`;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Função para copiar texto para a área de transferência
    async function copiarParaAreaTransferencia(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            mostrarToast('Texto copiado com sucesso!');
        } catch (err) {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = texto;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            mostrarToast('Texto copiado com sucesso!');
        }
    }

    // =================================================
    // INICIALIZAÇÃO DA PÁGINA
    // =================================================

    // Função para gerar os botões das pousadas
    function popularPaineis() {
        paineisContainer.innerHTML = '';
        
        for (const [nome, url] of Object.entries(pousadas)) {
            const a = document.createElement('a');
            a.href = url;
            a.textContent = nome;
            a.className = 'btn-pousada';
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            
            if (nome === "NOTA FISCAL") {
                a.classList.add('special');
            }
            
            paineisContainer.appendChild(a);
        }
    }

    // Função para popular o select de pousadas na cotação
    function popularFormularioCotacao() {
        cotacaoPousadaSelect.innerHTML = '';
        
        for (const nome of Object.keys(enderecos)) {
            const option = document.createElement('option');
            option.value = nome;
            option.textContent = nome;
            cotacaoPousadaSelect.appendChild(option);
        }
        
        // Atualiza os quartos quando a pousada muda
        cotacaoPousadaSelect.addEventListener('change', atualizarQuartosCotacao);
        atualizarQuartosCotacao(); // Chama uma vez para carregar os quartos iniciais
    }

    // Função para atualizar os tipos de quarto baseado na pousada selecionada
    function atualizarQuartosCotacao() {
        const pousadaSelecionada = cotacaoPousadaSelect.value;
        const categoria = pousadaSelecionada.includes('SOLAR') ? 'JOAO_FERNANDES' : 'POUSADA';
        const quartos = tiposQuarto[categoria];
        
        cotacaoQuartoSelect.innerHTML = '';
        
        quartos.forEach(quarto => {
            const option = document.createElement('option');
            option.value = quarto;
            option.textContent = quarto;
            cotacaoQuartoSelect.appendChild(option);
        });
    }

    // Função para gerar os botões dos lofts (01 a 08)
    function gerarBotoesLofts() {
        loftsBotoesContainer.innerHTML = '';
        
        for (let i = 1; i <= 8; i++) {
            const num = i.toString().padStart(2, '0');
            const button = document.createElement('button');
            button.textContent = num;
            button.type = 'button';
            
            button.addEventListener('click', () => {
                const idioma = document.getElementById('lofts-idioma').value;
                const template = templatesMensagemLofts[idioma];
                const mensagem = template.replace('{num}', num);
                resultadoLofts.value = mensagem;
            });
            
            loftsBotoesContainer.appendChild(button);
        }
    }

    // =================================================
    // LÓGICA DA COTAÇÃO
    // =================================================

    function processarCotacao() {
        const texto = document.getElementById('texto-cloudbeds').value.trim();
        
        if (!texto) {
            mostrarToast('Por favor, cole o texto da cotação do Cloudbeds.', 'error');
            return;
        }

        try {
            // Regex melhorado para extrair datas e valor
            const datasRegex = /([\wÀ-ÿ]{3}),\s*([\wÀ-ÿ]+)\.?\s*(\d{1,2})\s*-\s*([\wÀ-ÿ]{3}),\s*([\wÀ-ÿ]+)\.?\s*(\d{1,2})/i;
            const valorRegex = /R\$\s?(\d{1,3}(?:\.\d{3})*,\d{2}|\d+,\d{2}|\d+)/;

            const datasMatch = texto.match(datasRegex);
            const valorMatch = texto.match(valorRegex);

            if (!datasMatch || !valorMatch) {
                mostrarToast('Formato de texto inválido. Verifique se o texto contém datas e valor.', 'error');
                return;
            }

            const [, diaInSemana, mesIn, diaIn, diaOutSemana, mesOut, diaOut] = datasMatch;
            const valorTotal = valorMatch[0];

            // Converte mês para número
            const mesInNum = mesesMap[mesIn.toLowerCase().replace('.', '')];
            const mesOutNum = mesesMap[mesOut.toLowerCase().replace('.', '')];

            if (!mesInNum || !mesOutNum) {
                mostrarToast('Mês não reconhecido. Verifique o formato da data.', 'error');
                return;
            }

            // Formata as datas
            const mesAtual = 8; // Agosto
            const anoAtual = 2025;

            let anoCheckin = anoAtual;
            let anoCheckout = anoAtual;

            // Se o mês de entrada for menor que agosto, já é para o próximo ano
            if (parseInt(mesInNum) < mesAtual) {
                anoCheckin = anoAtual + 1;
            }

            // Se o mês de saída for menor que agosto, já é para o próximo ano
            if (parseInt(mesOutNum) < mesAtual) {
                anoCheckout = anoAtual + 1;
            }

            // Se o mês de saída for menor que o mês de entrada, é virada de ano
            if (parseInt(mesOutNum) < parseInt(mesInNum)) {
                anoCheckout = anoCheckin + 1;
            }

            const checkinData = `${diaIn.padStart(2, '0')}/${mesInNum}/${anoCheckin}`;
            const checkoutData = `${diaOut.padStart(2, '0')}/${mesOutNum}/${anoCheckout}`;

            const checkinDT = new Date(`${anoCheckin}-${mesInNum}-${diaIn}`);
            const checkoutDT = new Date(`${anoCheckout}-${mesOutNum}-${diaOut}`);
            const diarias = Math.round((checkoutDT - checkinDT) / (1000 * 60 * 60 * 24));

            if (diarias <= 0) {
                mostrarToast('Erro no cálculo de diárias. Verifique as datas.', 'error');
                return;
            }

            // Obtém dados do formulário
            const nomePousada = cotacaoPousadaSelect.value;
            const pax = document.getElementById('cotacao-pax').value;
            const tipoQuarto = cotacaoQuartoSelect.value;
            const idioma = document.getElementById('cotacao-idioma').value;

            // Obtém traduções
            const labels = labelsIdiomas[idioma];
            const nomeTag = nomesPousadasMap[nomePousada][idioma];
            const quartoTag = tiposQuartoMap[tipoQuarto][idioma];

            // Determina termos no plural/singular
            const termoNoites = diarias === 1 ? labels.noite : labels.noites;
            const termoPessoas = parseInt(pax) === 1 ? labels.pessoa : labels.pessoas;

            // Gera a cotação formatada
            let cafeMsg = labels.cafe;
            if (nomePousada === 'SOLAR JOÃO FERNANDES') {
                cafeMsg = ''; // Não exibe café da manhã para Solar João Fernandes
            }

            const cotacaoFormatada = `🏡 ${nomeTag}
📍 Endereço: ${enderecos[nomePousada]}
🛏️ ${quartoTag}

📅 Datas da Estadia
➡️ ${labels.checkin}: ${diaInSemana}, ${checkinData}
⬅️ ${labels.checkout}: ${diaOutSemana}, ${checkoutData}

📊 Resumo da Reserva
🌙 ${diarias} ${termoNoites}
👥 ${pax} ${termoPessoas}

💰 ${labels.valor}: ${valorTotal}

${cafeMsg}

Aguardamos você! 🌟`;

            resultadoCotacao.value = cotacaoFormatada;
            mostrarToast('Cotação gerada com sucesso!');

        } catch (error) {
            console.error('Erro ao processar cotação:', error);
            mostrarToast('Erro ao processar a cotação. Tente novamente.', 'error');
        }
    }

    // Lógica da Calculadora de Porcentagem
    document.getElementById('btnCalcularPorcentagem').addEventListener('click', function() {
        const totalReserva = parseFloat(document.getElementById('totalReserva').value);
        const porcentagem = parseFloat(document.getElementById('porcentagem').value);
        const resultadoContainer = document.getElementById('resultadoPorcentagem');
        const valorCalculadoEl = document.getElementById('valorCalculado');
        const valorFinalEl = document.getElementById('valorFinal');

        if (isNaN(totalReserva) || isNaN(porcentagem)) {
            mostrarToast('Por favor, insira valores numéricos válidos.', 'error');
            return;
        }

        const valorCalculado = (totalReserva * porcentagem) / 100;
        const valorFinal = totalReserva - valorCalculado;

        valorCalculadoEl.textContent = `R$ ${valorCalculado.toFixed(2)}`;
        valorFinalEl.textContent = `R$ ${valorFinal.toFixed(2)}`;

        resultadoContainer.style.display = 'block';
    });

    // Lógica do Conversor de Moedas
    document.getElementById('btnConverterMoeda').addEventListener('click', function() {
        const valorBRL = parseFloat(document.getElementById('valorBRL').value);
        const moedaDestino = document.getElementById('moedaDestino').value;
        const resultadoContainer = document.getElementById('resultadoConversao');
        const valorConvertidoEl = document.getElementById('valorConvertido');
        const taxaCambioInfoEl = document.getElementById('taxaCambioInfo');

        if (isNaN(valorBRL)) {
            mostrarToast('Por favor, insira um valor válido em Reais.', 'error');
            return;
        }

        const apiUrl = `https://api.exchangerate-api.com/v4/latest/BRL`;

        valorConvertidoEl.textContent = 'Calculando...';
        taxaCambioInfoEl.textContent = '';
        resultadoContainer.style.display = 'block';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const taxa = data.rates[moedaDestino];
                const dataAtualizacao = new Date(data.time_last_updated * 1000).toLocaleDateString('pt-BR');

                if (taxa) {
                    const valorConvertido = valorBRL * taxa;
                    valorConvertidoEl.textContent = new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: moedaDestino
                    }).format(valorConvertido);

                    taxaCambioInfoEl.textContent = `Taxa: 1 BRL = ${taxa.toFixed(4)} ${moedaDestino} (Atualizado em: ${dataAtualizacao})`;
                } else {
                    valorConvertidoEl.textContent = 'Erro ao buscar a taxa.';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API:', error);
                valorConvertidoEl.textContent = 'Não foi possível conectar ao serviço de câmbio.';
            });
    });

    // ================= Lógica do Inventário de Quartos =================

    const inventarioData = {
        "centro-class": {
            nome: "Pousada Centro Class",
            quartos: {
                "01": { Camas: "1 casal + 1 solteiro", TV: "HQ TV + Controle HQ", "Controle de canais": "Vivensis", Ar: "Samsung + Controle Samsung", Espelho: "Grande", Abajur: "1", Cofre: "Não funcional" },
                "02": { Camas: "1 casal + 1 solteiro", TV: "HQ TV + Controle HQ", "Controle de canais": "Vivensis", Ar: "Samsung + Controle Samsung", Espelho: "Grande", Abajur: "1", Cofre: "Não funcional" },
                "03": { Camas: "1 casal + 1 solteiro", TV: "Toshiba + Controle Toshiba", "Controle de canais": "Vivensis", Ar: "Samsung + Controle Samsung", Espelho: "Sim", Abajur: "1", Cofre: "Funcional" },
                "04": { Camas: "1 casal + 1 solteiro", TV: "HQ TV + Controle HQ", "Controle de canais": "Vivensis", Ar: "Agratto + Controle branco Agratto", Espelho: "Grande", Abajur: "1", Cofre: "Funcional" },
                "05": { Camas: "1 casal + 1 solteiro", TV: "HQ TV + Controle HQ", "Controle de canais": "Vivensis", Ar: "Samsung + Controle Samsung", Espelho: "Sim", Abajur: "2", Cofre: "Não funcional" },
                "06": { Camas: "1 casal", TV: "Philco TV + Controle Philco", "Controle de canais": "Vivensis", Ar: "Samsung + Controle universal", Espelho: "Sem", Abajur: "1", Cofre: "Não funcional" },
                "07": { Camas: "1 casal", TV: "Philco TV + Controle Philco", "Controle de canais": "Vivensis", Ar: "Samsung + Controle Samsung", Espelho: "Grande", Abajur: "2", Cofre: "Não possui" },
                "08": { Camas: "1 casal", TV: "HQ TV + Controle HQ", "Controle de canais": "Vivensis", Ar: "Samsung + Controle universal", Espelho: "Sim", Abajur: "2", Cofre: "Não possui" },
                "09": { Camas: "1 casal", TV: "Philco TV + Controle Philco", "Controle de canais": "Vivensis", Ar: "Comfee + Controle universal", Espelho: "Sim", Abajur: "+2", Cofre: "Não possui" },
                "10": { Camas: "Sem informações ainda" }
            }
        },
        "casa-centro": {
            nome: "Pousada Casa Centro",
            quartos: { /* Adicione os quartos da Casa Centro aqui quando tiver */ }
        },
        "centro-up": {
            nome: "Pousada Centro Up",
            quartos: { /* Adicione os quartos da Centro Up aqui quando tiver */ }
        }
    };

    const quartosContainer = document.getElementById('quartos-container');
    const modal = document.getElementById('inventory-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitulo = document.getElementById('modal-quarto-titulo');
    const modalBody = document.getElementById('modal-quarto-body');
    const pousadaSelectors = document.querySelectorAll('.btn-inventario');

    function displayQuartos(pousadaId) {
        quartosContainer.innerHTML = '';
        const pousada = inventarioData[pousadaId];
        if (!pousada || Object.keys(pousada.quartos).length === 0) {
            quartosContainer.innerHTML = '<p style="color: #888;">Nenhum quarto cadastrado para esta pousada.</p>';
            return;
        }
        // Ordena os quartos numericamente
        Object.keys(pousada.quartos).sort((a, b) => Number(a) - Number(b)).forEach(numeroQuarto => {
            const btn = document.createElement('button');
            btn.className = 'btn-quarto';
            btn.textContent = numeroQuarto;
            btn.onclick = () => showInventoryModal(pousadaId, numeroQuarto);
            quartosContainer.appendChild(btn);
        });
    }

    function showInventoryModal(pousadaId, numeroQuarto) {
        const pousada = inventarioData[pousadaId];
        const quarto = pousada.quartos[numeroQuarto];
        modalTitulo.textContent = `${pousada.nome} - Quarto ${numeroQuarto}`;
        modalBody.innerHTML = '';
        for (const item in quarto) {
            let label = item;
            let valor = quarto[item];
            // Ajusta para Espelho grande
            if (item === "Espelho" && valor.toLowerCase() === "grande") {
                label = "Espelho grande";
                valor = "SIM";
            }
            const p = document.createElement('p');
            p.innerHTML = `<strong>${label}:</strong> <span>${valor}</span>`;
            modalBody.appendChild(p);
        }
        modal.style.display = 'flex';
    }

    pousadaSelectors.forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) return;
            pousadaSelectors.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const pousadaId = button.getAttribute('data-pousada');
            displayQuartos(pousadaId);
        });
    });

    modalClose.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        const firstEnabledPousada = document.querySelector('.btn-inventario:not(:disabled)');
        if (firstEnabledPousada) {
            firstEnabledPousada.click();
        }
    });

    // =================================================
    // EVENT LISTENERS
    // =================================================

    // Botão processar cotação
    btnProcessarCotacao.addEventListener('click', processarCotacao);

    // Botões de copiar
    btnCopiarCotacao.addEventListener('click', () => {
        const texto = resultadoCotacao.value;
        if (texto.trim()) {
            copiarParaAreaTransferencia(texto);
        } else {
            mostrarToast('Nenhuma cotação para copiar.', 'error');
        }
    });

    btnCopiarLofts.addEventListener('click', () => {
        const texto = resultadoLofts.value;
        if (texto.trim()) {
            copiarParaAreaTransferencia(texto);
        } else {
            mostrarToast('Nenhuma mensagem para copiar.', 'error');
        }
    });

    // Tecla Enter no textarea da cotação para processar
    document.getElementById('texto-cloudbeds').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            processarCotacao();
        }
    });

    // =================================================
    // INICIALIZAÇÃO
    // =================================================

    // Chama as funções de inicialização
    popularPaineis();
    popularFormularioCotacao();
    gerarBotoesLofts();

    // Adiciona animação de entrada suave
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    console.log('🏨 Painel de Pousadas G Hotelaria carregado com sucesso!');
});

