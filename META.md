# META.md — Referência Oficial Meta Pixel

> **DOCUMENTO PROTEGIDO** — Este arquivo registra as regras oficiais do Meta Pixel
> conforme documentação em `developers.facebook.com` (consultada em junho/2026).
> **Nunca altere este documento.** Qualquer implementação de pixel neste projeto
> deve obedecer estritamente as regras aqui descritas.

---

## Fonte

- https://developers.facebook.com/docs/meta-pixel/get-started
- https://developers.facebook.com/docs/meta-pixel/reference
- https://developers.facebook.com/docs/meta-pixel/implementation/conversion-tracking
- https://developers.facebook.com/docs/meta-pixel/advanced/
- https://developers.facebook.com/docs/meta-pixel/guides/track-multiple-events/

---

## 1. Inicialização — `fbq('init')`

### Regra fundamental
`fbq('init', 'PIXEL_ID')` deve ser chamado **uma única vez por pixel ID**, no carregamento da página, antes de qualquer evento.

### Comportamento interno
- Quando `init` é chamado para um pixel ID, ele armazena esse ID em uma **fila global**.
- Toda chamada subsequente de `track` ou `trackCustom` dispara o evento para **todos os pixels previamente inicializados**.
- A biblioteca `fbevents.js` carrega **somente uma vez**, mesmo que múltiplos `<script>` a referenciem.

### O que NÃO fazer
```js
// ❌ ERRADO — nunca chame init antes de cada evento
function dispararEvento(nome) {
  fbq('init', 'PIXEL_ID');   // ← ERRADO: reinicializa a cada chamada
  fbq('track', nome);
}
```

### O que fazer
```js
// ✅ CORRETO — init uma única vez, no carregamento da página
fbq('init', 'PIXEL_ID');
fbq('track', 'PageView');

// Depois, disparar eventos diretamente:
fbq('track', 'ViewContent');
fbq('trackCustom', 'VideoPlay');
```

---

## 2. Eventos Padrão — `fbq('track', 'NomeDoEvento')`

Usar `fbq('track', ...)` **somente** com os 17 eventos padrão reconhecidos pelo Meta:

| Nome do Evento         | Quando usar                                                   |
|------------------------|---------------------------------------------------------------|
| `AddPaymentInfo`       | Dados de pagamento adicionados ao checkout                    |
| `AddToCart`            | Produto adicionado ao carrinho                                |
| `AddToWishlist`        | Produto adicionado à lista de desejos                        |
| `CompleteRegistration` | Formulário de cadastro concluído                             |
| `Contact`              | Usuário inicia contato com o negócio                         |
| `CustomizeProduct`     | Usuário personaliza um produto                               |
| `Donate`               | Usuário faz uma doação                                       |
| `FindLocation`         | Usuário busca localização da loja                            |
| `InitiateCheckout`     | Usuário entra no fluxo de checkout                           |
| `Lead`                 | Cadastro/lead concluído                                      |
| `Purchase`             | Compra realizada ou checkout finalizado                      |
| `Schedule`             | Agendamento realizado                                        |
| `Search`               | Busca realizada                                              |
| `StartTrial`           | Usuário inicia período de teste gratuito                     |
| `SubmitApplication`    | Usuário envia candidatura ou solicitação                     |
| `Subscribe`            | Usuário inicia assinatura paga                               |
| `ViewContent`          | Visita a uma página de interesse                             |

**Parâmetros obrigatórios para `Purchase`:** `currency` e `value`.

---

## 3. Eventos Customizados — `fbq('trackCustom', 'NomeCustomizado')`

Qualquer evento que **não esteja na lista de eventos padrão** acima deve usar `fbq('trackCustom', ...)`.

```js
// ✅ CORRETO — eventos customizados usam trackCustom
fbq('trackCustom', 'VideoPlay');
fbq('trackCustom', 'VideoProgress25', { milestone: 25 });
fbq('trackCustom', 'VideoProgress50', { milestone: 50 });
fbq('trackCustom', 'VideoProgress75', { milestone: 75 });
fbq('trackCustom', 'VideoComplete');
```

### Regras para nomes de eventos customizados
- Devem ser **strings**
- Não podem ultrapassar **50 caracteres**

### O que NÃO fazer
```js
// ❌ ERRADO — usar fbq('track') com evento não-padrão
fbq('track', 'VideoPlay');        // o Meta não reconhece como evento padrão
fbq('track', 'VideoProgress25'); // descartado silenciosamente ou mal categorizado
```

---

## 4. Múltiplos Pixels — `trackSingle` e `trackSingleCustom`

Quando há mais de um pixel inicializado na página, `fbq('track')` e `fbq('trackCustom')` disparam para **todos os pixels** simultaneamente.

Para enviar um evento para **um pixel específico**, usar:

```js
// Evento padrão para pixel específico
fbq('trackSingle', 'PIXEL_ID', 'Purchase', { value: 97, currency: 'BRL' });

// Evento customizado para pixel específico
fbq('trackSingleCustom', 'PIXEL_ID', 'VideoProgress50', { milestone: 50 });
```

---

## 5. Resumo das Funções

| Função                  | Quando usar                                                        |
|-------------------------|--------------------------------------------------------------------|
| `fbq('init', ID)`       | Uma vez por pixel, no carregamento da página                      |
| `fbq('track', evento)`  | Somente para os 17 eventos padrão do Meta                         |
| `fbq('trackCustom', e)` | Para qualquer evento fora da lista padrão                         |
| `fbq('trackSingle')`    | Evento padrão direcionado a um pixel específico (multi-pixel)     |
| `fbq('trackSingleCustom')` | Evento customizado direcionado a um pixel específico (multi-pixel) |

---

## 6. Aplicação neste projeto

Com base nas regras acima, os eventos de vídeo deste projeto são **todos customizados** e devem usar `fbq('trackCustom')`:

| Evento usado no projeto | Tipo correto   |
|-------------------------|----------------|
| `VideoPlay`             | `trackCustom`  |
| `VideoProgress25`       | `trackCustom`  |
| `VideoProgress50`       | `trackCustom`  |
| `VideoProgress75`       | `trackCustom`  |
| `VideoComplete`         | `trackCustom`  |
| `ViewContent`           | `track` ✅     |
| `InitiateCheckout`      | `track` ✅     |

---

*Fonte: documentação oficial Meta for Developers — developers.facebook.com — junho/2026.*
