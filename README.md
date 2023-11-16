![poster](https://user-images.githubusercontent.com/54267140/155941400-1009371a-0aaa-439d-8ea6-bffcae25b52a.png)

# Solaris

En webbplats byggd med HTML, CSS & vanilla JS om vårt solsystem. Det ska gå att klicka på en planet och där få mer information om planeten
i någon form av "overlay". Se skiss nedan.

## UI

Skiss hittar du [här](https://www.figma.com/file/zy3VW5pAiizLkBRnhtiuC3/JS-%2F-Solaris?type=design&mode=design&t=PjbrROQIRGIrPfsO-0).
## API

**Base URL**

```
https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/
```

**Methods**
|enpoint|method|desc|
|---|---|---|
|/keys|POST|returnerar en API nyckel.|
|/bodies|GET|returnerar alla stora himlakroppar i vårt solsystem.|

**Authentication**

API:et är låst med en API-nyckel. Alla GET-request utan en sådan kommer genera en `401`.

API-nyckel som kan användas för **Godkänt**: `solaris-1Cqgm3S6nlMechWO`.

**Hämtar en API-nyckel**
```js
let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys", {
  method: "POST"
});
```

För att få läsrättigheter måste du i din request bifoga headern `x-zocom` med en giltig API-nyckel.

**Hämtar planeter**

Ex.

```js
let resp = await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
  method: "GET",
  headers: { "x-zocom": "<solaris-key-here>" },
});
```

## Modell

| egenskap      | datatyp | enhet                                               |
| ------------- | ------- | --------------------------------------------------- |
| id            | number  | -                                                   |
| type          | string  | star & planet                                       |
| name          | string  | namnet på himlakroppen                              |
| latinName     | string  | Latinska namnet på himlakroppen                     |
| rotation      | number  | Längd på dygn i antal _jorddygn_ runt sin egen axel |
| circumference | number  | Omkrets i km                                        |
| temp          | Object  | Temperatur _day_ och _night_ i celcius.             |
| distance      | number  | km från solen                                       |
| orbitalPeriod | Number  | Antal _jorddygn_ runt solen                         |
| desc          | string  | Beskrivning av himlakroppen                         |
| moons         | Array   | Lista med månarnas namn                             |

### Exempel

```js
{
    id: 2,
    type: 'planet',
    name: 'Venus',
    latinName: 'Venus',
    rotation: 116,
    circumference: 38025,
    temp: {
        day: 430,
        night: -173
    },
    distance: 10820000,
    orbitalPeriod: 225,
    desc: 'Venus har ...',
    moons: []
}
```

## Betygskriterier

**Godkänt**

- Att det ser ut enligt skiss. Viss variation i färger etc är okej.
- Att API:et används.
- Sidan fungerar med inga fel i konsolen i developer tools.
- Vettiga namn på variabler etc på engelska.

**Väl godkänt**

- Allt i godkänt.
- Att din kod är uppdelad i tydliga funktioner med vettiga namn. Skriv en kommentar om vad varje funktion gör.
- Inga hårdkodade API-nycklar utan det ska alltid göras ett anrop för att få en API-nyckel först, innan varje anrop.

## Inlämning

Inlämning sker senast _Fredag 17 nov 23.59_ via en länk till ditt githubrepo på Learnpoint.
