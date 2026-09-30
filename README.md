# senhas-brabas

Um laboratório visual, em português, para entender passo a passo uma transformação didática de senha.

## Como funciona

1. A senha é convertida para bytes UTF-8.
2. Cada byte recebe uma máscara XOR com o valor `42`.
3. Os bytes transformados são exibidos em hexadecimal.
4. O resultado é representado em Base64.

Tudo roda no navegador e nada é enviado a um servidor.

> **Atenção:** este projeto é educacional. Codificação Base64/XOR é reversível e não protege senhas. Para aplicações reais, use hashing com Argon2id ou bcrypt, além de boas práticas de autenticação.

## Executar

Abra `index.html` no navegador. Não há dependências de build.
