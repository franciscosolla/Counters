![Counters App Icon](https://drive.google.com/uc?export=view&id=18loPwcAHDr_6mRNr1ai49KZRpaPVjJmp )
#  Counters 

Neste repositorio você encontra o código de um app demo em React Native. Feito como estudo e demonstração da implementação de diferentes estruturas comumente encontradas em apps desenvolvidos com React Native.

Foi desenvolvido de forma a ser compativel com ambos Expo Cli e React Native puro, paralelamente. Isto foi feito visando agilizar o desenvolvimento do aplicativo utilizando o Expo mas sem perder a flexibilidade e controle fornecida pelo React Native puro.

# Instruções

Para rodar o app em **debug** pode-se utilizar tanto `expo start` quanto `npx react-native run-android`.

Para construir os arquivos **release** (standalone), só é possível através do React Native puro, `cd android | ./gradlew bundleRelease` ou `cd android | ./gradlew asemmbleRelease` para android. Não foi possível configurar e testar builds **release** nativos iOS pela falta de um MacOS a disposição.
> Este projeto **NÃO** é compativel com Expo Build, isto é `expo build:android` e `expo build:ios`.

A escolha de suportar paralelamente a plataforma Expo para testes (debug), se deu também pela indisponibilidade de um MacOS para testar o aplicativo em dispositivos iOS. Já que o Expo permite rodar o aplicativo através do Expo Client, sem fazer uma build nativa iOS.

Além disso o Expo provê automaticamente funcionalidades interessantes, como o OTA, Over-The-Air Updates, que permite atualizar o bundle javascript do app sem publicar um novo binário nas lojas de aplicativos.

# Sobre

O repositório contém duas branchs: master e redux:

- A branch **master** implementa os estados do app com hooks costumizados.
    > https://github.com/franciscosolla/Counters/tree/master
- A branch **redux** implementa os estados do app com Redux e Redux Saga
    > https://github.com/franciscosolla/Counters/tree/redux

As duas branchs implementam um aplicativo que permite criar "contadores" e gerencia-los através de ações de "adicionar contador", "remover contador", "selecionar contador", "incremenar contador selecionado", "decrementar contador selecionado", "reiniciar contador selecionado".

Além disso, contam com:
- testes unitários de asserção do funcionamento de seus componentes e telas
	>  Rode os testes com `npm test` .
- seleção dinâmica do tema do aplicativo (claro ou escuro)
- seleção dinâmica do idioma do aplicativo, internacionalização (português e inglês)
	> Selecione o tema e idioma na tela de "Opções" ou "Settings", que pode ser acessada através do botão/icone no canto superior direito do aplicativo.

# Builds

Algumas builds deste aplicativo estão disponiveis através do link:
- https://drive.google.com/drive/folders/1adxQ0lSD-ljLsQc1tpv9pp5wIvJfDEno?usp=sharing

Recomendo o apk gerado através do React Native puro na branch master:
- https://drive.google.com/file/d/1RhW40eOaVwuURxfmWS_zdRvR1PZqc6b8/view?usp=sharing
- https://github.com/franciscosolla/Counters/releases/tag/react-native-v1.1
