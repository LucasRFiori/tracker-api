
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

- [Lucas Fiori](https://www.linkedin.com/in/lucas-fiori-763326196/) - RA: 600687
- Rafael Yoshio Tanaka Eto - RA: 601063
- João Vitor Mouro Barboza - RA: 600652
- Felipe Hiroyuki Kaihatsu - RA: 600636
- Nicolas Hiroyuki Nacasawa - RA: 605700

