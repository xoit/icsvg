# Configuration

initialize the svg element:

```js
var s = Snap("#svg");
s.attr({ viewBox: "0 0 500 130" });

var startx = 20 ;
var starty = 20 ;
```

## icsvg_reg

```js
var conf={
  x: startx,
  y: starty,
  latch: false,
  size: 50,
  color: "#f00",
  reset: -1,
  triggle: 1,
  d_length: 0,
  q_length: 28,
  ck_to_q: true
} ;

var ff=(s,conf) ;
```

## icsvg_logic

```js
var conf={
  x: startx+80,
  y: starty,
  scale: 0.3
} ;

var comb=icsvg_logic(s,conf) ;
```

## icsvg_repeater

```js
var conf={
  x: startx-10,
  y: starty+60,
  size: 9,
  type:"buffer",
  color:"#123456",
  orient:"r270"
} ;

var buf=icsvg_repeater(s,conf) ;
```

## icsvg_connect

```js
conf= {
  from:buf2.Z,
  to:reg1.CK,
  dir:"clockwise",
  color:"#123456"
} ;

var conn=icsvg_connect(s,conf) ;
```

## icsvg_text

```js
conf= {
  from:buf2.Z,
  to:reg1.CK,
  dir:"clockwise",
  color:"#123456"
} ;

var conn=icsvg_text(s,conf) ;
```

## icsvg_port

```js
conf= {
  x:20,
  y:20,
  name:"CLK",
  color:"#123456"
} ;

var conn=icsvg_port(s,conf) ;
```
