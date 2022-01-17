# Messages

## Keep-Alive

Keep the socket alive

```json
{
    "message": 0,
    "data": {}
}
```

## Handshake

Introduce the client to the server. C -> S

```json
{
    "message": 1,
    "data": {
        "nickname": "<nickname>"
    }
}
```

## Join a game

Client indicates that it wants to join a game. C -> S

```json
{
    "message": 2,
    "data": {
        "invite_code": null
    }
}
```

## Board update

Server updates board position. S -> C

```json
{
    "message": 3,
    "data": {
        "board": "<BOARD-FEN>"
    }
}
```

## Move

A move is made. Bidirectional.

```json
{
    "message": 4,
    "data": {
        "from": {
            "row": 1,
            "col": 1
        },
        "to": {
            "row": 3,
            "col": 3
        }
    }
}
```

## Set color

Sets the color of the player. S -> C

```json
{
    "message": 5,
    "data": {
        "color": "b|w|n"
    }
}
```

## Set state

Sets the state of the game, contains an optional, state-specific payload. S -> C

```json
{
    "message": 6,
    "data": {
        "state": GameState,
        "stateInfo": {
            ...
        }
    }
}
```

## Resign

Player resigns. C -> S

```json
{
    "message": 7,
    "data": {}
}
```

## Redeem purchase

Redeem the purchase indicated by the order ID. C -> S

```json
{
    "message": 8,
    "data": {
        "orderId": "<ORDERID>"
    }
}
```

## Set inventory

Sets the inventory of a client. S -> C

```json
{
    "message": 9,
    "data": {
        "inventory": {
            "drunk": 4,
            ...
        }
    }
}
```

## Use item

Uses an item. Contains an item-specific payload. Bidirectional.

```json
{
    "message": 10,
    "data": {
        "item": ItemEnum,
        "itemData": {
            ...
        }
    }
}
```
