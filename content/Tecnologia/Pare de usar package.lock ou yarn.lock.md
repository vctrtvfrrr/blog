---
title: Pare de usar package-lock.json ou yarn.lock
date: 2015-11-11T10:08:04Z
description: "Entenda por que você deve evitar usar package-lock.json ou yarn.lock em pacotes que são dependências de outros projetos."
excerpt: "Saiba por que não deve usar package-lock.json ou yarn.lock em pacotes que são dependências de outros projetos, e como isso pode afetar a consistência das dependências."
tags: [Node.js, npm, package-lock.json, yarn.lock]
draft: false
---
Este título é, de certa forma, um click-bait. Mas navegando por projetos públicos no GitHub, as PRs que eu mais vejo são de pessoas adicionando ou alterando arquivos `package-lock.json` ou `yarn.lock` nos repositórios. Essas PRs, na maioria dos casos, são fechadas sem um merge porque os arquivos de lock de dependência não são projetados para serem usados ​​em pacotes, uma vez que eles mesmos são dependências de outros pacotes.

## O que está acontecendo de errado?

A documentação oficial do NPM incentiva o commit de arquivos `package-lock.json` para o controle de versão do código-fonte:

> It is highly recommended you commit the generated package lock to source control: this will allow anyone else on your team, your deployments, your CI/continuous integration, and anyone else who runs **npm install** in your package source to get the exact same dependency tree that you were developing on. Additionally, the diffs from these changes are human-readable and will inform you of any changes npm has made to your **node_modules**, so you can notice if any transitive dependencies were updated, hoisted, etc.

- https://docs.npmjs.com/files/package-locks#using-locked-packages

Comitar o `package-lock.json` no versionamento do código-fonte significa que os mantenedores do projeto e os sistemas de CI usarão uma versão específica de dependências que podem ou não corresponder às definidas no `package.json`. Como `package-lock.json` não pode ser adicionado ao registro do NPM (por definição; consulte o [NPM shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap)), os projetos que dependem de outro projeto que usa `package-lock.json` usarão o seu próprio `package.json` para resolver as dependências, ou seja, o que funciona para os mantenedores do projeto/sistema de CI pode não funcionar quando o projeto é usado como uma dependência.

A origem desse prolema está na própria documentação do NPM. Ela é que deveria explicar que o `package-lock.json` só deve ser comitado junto ao código-fonte quando o projeto não é uma dependência de outros projetos, ou seja, `package-lock.json` deve apenas ser comitado junto ao código-fonte de projetos de alto-nível (apps utilizados pelo usuário final, não outros apps).
