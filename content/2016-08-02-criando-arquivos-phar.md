---
layout: post
title: Criando arquivos Phar
subtitle: Empacotando scripts PHP
date: 2016-08-02T19:27:28Z
tags: [php, phar]
---

Uma das coisas que eu mais gosto de fazer como programador é automatizar pequenas tarefas do dia-a-dia. Geralmente eu começo com scripts bash, mas quem escreve scripts bash sabe o quão bizarro seu script pode se tornar na maioria das vezes.

Embora existam tantas outras linguagens de programação excelentes para _scripting_, decidi escrever este tutorial focando no PHP. Em primeiro lugar, para demonstrar a versatilidade da linguagem (mais uma vez), em segundo, porque ainda é uma das linguagens mais populares do mundo e em terceiro, porque, ao longo dos anos, continua sendo uma das minhas linguagens favoritas (apesar de tudo o que dizem rsrs).

O bacana de utilizar o PHP diretamente no CLI é que, muitas vezes, seu script bash acaba se transformando em uma "ferramenta", o que requer outros arquivos, classes, e uma organização de diretórios e arquivos que seja mais coerente.

Se você também usa o PHP no dia-a-dia, provavelmente já se deparou com vários arquivos phar. Os exemplos mais clássicos são o [Composer](https://getcomposer.org/) e o [PHP-CS-Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer), mas também existem muitos outros.

Eu nunca me preocupei em aprender a criar esses arquivos antes porque supus que seria difícil, mas na verdade é mais fácil do que se pode imaginar.

## Passo a passo

Antes de tudo, crie um diretório para o seu projeto com uma pasta dentro chamada `app`, onde colocaremos o código-fonte da nossa aplicação.

```bash
mkdir -p meu-projeto/app
```

Copie todos os arquivos da sua aplicação PHP para dentro da pasta `app` e, em seguida, crie um arquivo chamado `main.php`, que servirá de _entrypoint_ para o app. Você pode dar o nome que quiser para o arquivo de entrada, basta editar os demais arquivos de configuração. Aqui vamos manter esse nome pra deixar as coisas padronizadas.

Abaixo está o script que "compilará" a aplicação e gerará o arquivo phar. Crie um arquivo chamado `compile.php`, no diretório raiz do projeto, e cole o código abaixo nele.

```php
<?php

$pharFile = 'meu-app.phar';

// Remove os arquivos anteriores
if (file_exists($pharFile)) {
    unlink($pharFile);
}

if (file_exists($pharFile . '.gz')) {
    unlink($pharFile . '.gz');
}

// Cria um novo arquivo Phar
$phar = new Phar($pharFile);

// Inicia o buffer. Obrigatório para aguardar a modificação do conteúdo do
// arquivo "compilado" e adicionar o shebang (#!) no início do arquivo.
$phar->startBuffering();

// Cria o esboço padrão a partir do entrypoint (main.php)
$defaultStub = $phar->createDefaultStub('main.php');

// Adiciona os demais arquivos da aplicação
$phar->buildFromDirectory(__DIR__ . '/app');

// Customiza o esboço adicionando o shebang no início
$stub = "#!/usr/bin/php \n\n" . $defaultStub;

// Adiciona o esboço customizado ao buffer
$phar->setStub($stub);

// Finaliza o buffer e manda o output para o arquivo phar
$phar->stopBuffering();

// -- Opcional --
// Compacta o arquivo phar como gzip
$phar->compressFiles(Phar::GZ);

// Transforma o arquivo num executável
chmod(__DIR__ . DIRECTORY_SEPARATOR . $pharFile, 0770);

echo "$pharFile criado com sucesso!" . PHP_EOL;
```

### Desativando temporariamente o parâmetro `phar.readonly`

Para poder criar o arquivo phar, precisamos desativar temporariamente o parâmetro `phar.readonly` no arquivo `php.ini`. Por padrão, os arquivos phar não podem ser criados por uma questãoi de segurança. Imagine um script mal-intencionado criando executáveis no seu ambiente, complicado né!

Para mim, o arquivo `php.ini` está no diretório `/etc/php/5.6/cli/php.ini` e eu posso executar este _snippet_ bash para desativá-lo:

```bash
# O abaixo é uma linha só, dividi em multiplas linhas para facilitar a leitura
SEARCH=";phar.readonly = On" \
REPLACE="phar.readonly = Off" \
FILEPATH="/etc/php/5.6/cli/php.ini" \
sed -i "s;$SEARCH;$REPLACE;" $FILEPATH
```

### Compilando a aplicação

Agora basta executar o arquivo `compile.php` para criar um arquivo phar da aplicação. O phar deve ser executável, assim você pode colocá-lo no seu `$PATH` e começar a usá-lo como um comando (se preferir renomeie-o e remova a extensão .phar).

### Reativando o parâmetro `phar.readonly`

É sempre bom pensar em segurança, então, reative o `phar.readonly` no seu arquivo `php.ini` . O _snippet_ a seguir é uma cópia daquele que executamos antes, mas com as opções `On/Off` alteradas:

```bash
SEARCH="phar.readonly = Off" \
REPLACE=";phar.readonly = On" \
FILEPATH="/etc/php/7.0/cli/php.ini" \
sed -i "s;$SEARCH;$REPLACE;" $FILEPATH
```

## Debugando

Se você receber a mensagem de erro abaixo, significa que o parâmetro `phar.readonly` não foi desativado corretamento no arquivo `php.ini`. Isso significa que você terá que desativar o parâmetro manualmente. Procure pelo arquivo `php.ini` correto e desative o parâmetro. Caso ele não exista no seu arquivo de configurações, você terá que criá-la.

```log
PHP Fatal error:  Uncaught UnexpectedValueException: creating archive "app.phar" disabled by the php.ini setting phar.readonly in /caminho/para/meu-projeto/compile.php:15
Stack trace:
#0 /caminho/para/meu-projeto/compile.php(19): Phar->__construct('meu-app.phar')
#1 {main}
  thrown in /caminho/para/meu-projeto/compile.php on line 15
```

## Referências

- [Github Gist - Create a PHP Phar file](https://gist.github.com/vzool/ef200b902d5ce0f7f17b8d9f9514e243)
- [StackOverflow - How to make an executable phar?](https://stackoverflow.com/questions/11082337/how-to-make-an-executable-phar)
