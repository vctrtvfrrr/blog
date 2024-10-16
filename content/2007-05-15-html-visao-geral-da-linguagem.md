---
title: HTML - Visão geral da linguagem
date: 2007-05-15T17:15:01Z
tags: [html, DTD, doctype]
---

HTML significa **H**yper**t**ext **M**arkup **L**anguage, ou seja, Linguagem de Marcação de Hipertexto, e é a linguagem mais usada para exibir páginas na web.

- **Hypertext** refere-se à maneira pela qual as páginas da web (documentos HTML) são vinculadas. Assim, o link disponível em uma página é chamado de _hipertexto_.
- Como o próprio nome sugere, HTML é uma **linguagem de marcação**, o que significa que você usa o HTML para simplesmente "marcar" um documento de texto com tags que informam ao navegador como estruturá-lo para exibição.

Originalmente, o HTML foi desenvolvido com a intenção de definir a estrutura de documentos como títulos, parágrafos, listas e assim por diante para facilitar o compartilhamento de informações científicas entre os pesquisadores.

Atualmente, o HTML é amplamente utilizado para formatar páginas e websites, com a ajuda de diferentes novas tags que foram surgindo com o tempo com o propósito de dar mais fluidez às páginas ao invés de, simplesmente, formatar um texto.

## Documento HTML básico

Aqui temos um exemplo de um documento HTML em sua forma mais simples:

<script async src="//jsfiddle.net/vctrtvfrrr/kjcrxo1q/2/embed/html,result/"></script>

## Tags HTML

Como dito anteriormente, o HTML é uma linguagem de marcação e utiliza tags para formatar o conteúdo. Essas tags são colocadas entre colchetes: `<nome_da_tag>`. Com exceção de poucas tags, a maioria delas possui tags de fechamento correspondentes. Por exemplo, a tag `<html>` tem sua tag de fechamento `</html>` e a tag `<body>` tem sua `</body>` como tag de fechamento.

O exemplo anterior de documento HTML básico usa as seguintes tags:

| Tag             | Description                                                                                                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<!DOCTYPE...>` | Essa tag define o tipo de documento e a versão do HTML utilizada.                                                                                                                                        |
| `<html>`        | Essa tag inclui o documento HTML completo e compreende principalmente o cabeçalho do documento, representado por `<head>...</head>`, e o corpo do documento, representado pelas tags `<body>...</body>`. |
| `<head>`        | Essa tag representa o cabeçalho do documento, que pode manter outras tags, como `<title>`, `<link>` etc.                                                                                                 |
| `<title>`       | The `<title>` tag is used inside the `<head>` tag to mention the document title.                                                                                                                         |
| `<body>`        | Essa tag representa o corpo do documento que mantém outras tags como `<h1>`, `<div>`, `<p>` etc.                                                                                                         |
| `<h1>`          | Essa tag representa o cabeçalho.                                                                                                                                                                         |
| `<p>`           | Essa tag representa um parágrafo.                                                                                                                                                                        |

Para aprender HTML, você precisará estudar várias tags e entender como elas se comportam enquanto formata um documento textual. Aprender HTML é simples, pois você só precisa aprender o uso de diferentes tags e onde cada uma é utilizada.

> O World Wide Web Consortium (W3C) recomenda o uso de tags em minúsculas a partir do HTML 4.

## Estrutura do documento HTML

Um documento HTML típico terá a seguinte estrutura:

```html
<html>
  <head>
    Cabeçalho do documento e tags relacionadas
  </head>

  <body>
    Corpo do documento e tags relacionadas
  </body>
</html>
```

Estudaremos todas as tags do _head_ e _body_ nos próximos artigos. Por enquanto vamos ver o que é a tag de declaração de documento.

## A declaração `<!DOCTYPE>`

A tag de declaração `<!DOCTYPE>`, também conhecida como DTD, é usada pelo navegador para entender a versão do HTML usado no documento. A versão atual é o HTML 4.01 e faz uso das seguintes declarações:

### HTML 4.01 Strict

Este DTD contém todos os elementos e atributos HTML, mas não inclui elementos de apresentação ou depreciados (como fonte). Também não é permitido o uso de Framesets. Para essa forma, a declaração é feita como no código abaixo:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

### HTML 4.01 Transitional

Esse DTD contém todos os elementos e atributos HTML, incluindo elementos de apresentação e reprovados (como fonte). Assim como nos Strict, Framesets não são permitidos. Para essa forma, a declaração é feita como no código abaixo:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

### HTML 4.01 Frameset

Este DTD possui todas as funcionalidades do HTML 4.01 Transitional, mas permite o uso de Framesets. Para essa forma, a declaração é feita como no código abaixo:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

Existem muitos outros tipos de declaração que podem ser usados ​​no documento HTML, dependendo de qual versão do HTML está sendo usada. Veremos mais detalhes sobre isso enquanto discutimos a tag `<!DOCTYPE...>` junto com outras tags HTML.
