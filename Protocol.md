# Messages

## Handshake

```json
{
  "message": 1,
  "data": {
    "nickname": "<nickname>"
  }
}
```

## Join a game

```json
{
  "message": 2,
  "data": {
    "invite_code": null
  }
}
```

## Board update

```json
{
  "message": 3,
  "data": {
    "board": []
  }
}
```

## Move

```json
{
  "message": 6,
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