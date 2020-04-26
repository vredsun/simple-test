# АРМ Префекта


## Links

- [Design](https://www.figma.com/file/oiLnakWXK4vY2NE18gReEp/APM-Prefection?node-id=5433%3A952&viewport=1004%2C-553%2C0.5&scaling=scale-down)

- [https://awp.gost-group.com/#/messages](https://awp.gost-group.com/#/messages)

  login: `alexey`, password: `alexey`
  login: `admin`, password: `admin-123`

## Built With

- [**`TypeScript`**](https://www.typescriptlang.org/)
- [**`React`**](https://reactjs.org/)
- [**`Ant Design`**](https://ant.design/)
- [**`Styled Components`**](https://www.styled-components.com/)
- [**`Webpack`**](https://webpack.js.org/)
- [**`Redux`**](https://redux.js.org/), [**`Redux-Saga`**](https://redux-saga.js.org), [**`Dva`**](https://github.com/dvajs/dva)

## Development  `client`

  * используйте `dev` branch

  - install `nodejs`, `npm`

```shell
  npm run dev
```
## Production  `build`
```shell
  npm run build
```

  * клиент доступен на localhost:3000


## Модули

* В целом: большая часть модулей взаимодествет с картой. после инициализации  карты в приложении, она передается в модули в файле `routes/gis/index.tsx`
* Модули связаны между собой только через store приложения: `redux`
* На примере комопнента *Маршруты* `components/routes` можно увидеть общий принцип: модуль получает карту, подписывается на events, добавляет    элементы ui + слои на карту, при willUnmount удалят с карты свои слои.
* каждый модуль подключается в `routes/gis.tsx` , используя ErrorBoundary: не пропустите этот момент, чтобы приложение всегда
  функционировало независимо от module failure
* уточняйте "так или не так", "можно/нельзя" у аналитиков проекта, всегда можно прийти к более оптимальному варианту, если в постановке
  что-то противоречит data flow inside the module, вы видите вариант лучше
* см. [JIRA modules](https://gost-jira.atlassian.net/browse/DITEGIPDEV-775)

## Links

 - use functional techinques if possible
    - https://github.com/MostlyAdequate/mostly-adequate-guide
    - https://staltz.com/some-problems-with-react-redux.html
    - https://david-peter.de/cube-composer/
    - https://cycle.js.org/streams.html
    - http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda
    - https://www.youtube.com/watch?v=m3svKOdZijA
    - https://github.com/lodash/lodash/wiki/FP-Guide
    - https://gist.github.com/vvgomes/451ea5ca2c65e87c92e4
    - http://fr.umio.us/favoring-curry/
    - http://randycoulman.com/blog/categories/thinking-in-ramda/
    - http://worrydream.com/refs/Backus-CanProgrammingBeLiberated.pdf

 - styled-components
    - https://github.com/styled-components/styled-components/pull/1798
