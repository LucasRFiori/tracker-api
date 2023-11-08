
# API DE RASTREIO DE DISPOSITIVO

É uma aplicação que tem como objetivo controlar e receber a localização e também lidar com os dispositivos.







## Tecnologias utilizadas:

**Back-end:** 

* Node
* Express
* GraphQL
* gRPC
* AMQP
* MQTT
* MongoDB


## Fluxograma simplificado

<img width="1171" alt="image" src="https://github.com/LucasRFiori/tracker-broker/assets/47372133/c9c8d8a6-713c-493a-8474-78323f9165c5">
<img width="661" alt="image" src="https://github.com/LucasRFiori/tracker-broker/assets/47372133/05ab65eb-7dcb-4294-82ac-a39178b5e7c8">


## Documentação

Como iniciar?

```cli
# Instalando dependências NPM, YARN, PNPM
npm i

# Inicia a API, BROKER, GRAPHQL, MQTT e AMQP
yarn start

# Iniciar a simulação de um dispositivo, 
passando seu código.

yarn start:trigger {{CODIGO}}

```


## Documentação da API

### Listar todos os Dispositivos

```http
  GET /devices
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | Nome do usuário. |
| `username` | `string` | Username do usuário. |
| `password` | `string` | Senha do usuário. |

### Retornar dispositivo específico.

```http
  GET /devices/:deviceId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `deviceId` | `string` | Id do dispositivo. |

### Histórico de localização de um dispositivo.

```http
  GET /devices/:deviceId/location
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `deviceId` | `string` | Id do dispositivo. |


### Criar um dispositivo.
```http
  POST /devices
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `deviceId` | `string` | Id do dispositivo. |

```json
{
    "name": "Iphone XS",
    "code": "0003",
    "active": "true",
    "brand": "Iphone"
}
```

### Atualizar dados de um dispositivo:

```http
  PATCH /devices/:deviceId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `deviceId` | `string` | Id do dispositivo. |

```json
{
    "brand": "Xiaomi"
}
```

*Obs*: é possível atualizar todos os dados.

### Apagar um dispositivo:

```http
  DELETE /devices/:deviceId
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `deviceId` | `string` | Id do dispositivo. |

### Salvar uma localização do dispositivo:

```http
  POST /location
```


```json
{
    "deviceCode": "0001",
    "latitude": "-85.99999",
    "longitude": "90.3333333"
}
```


## Autores

- [Lucas Fiori](https://www.linkedin.com/in/lucas-fiori-763326196/)

