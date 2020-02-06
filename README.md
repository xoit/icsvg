# icsvg

Use snapsvg to show the IC components

## Snapshort

![20200205](asset/20200205.png)

## Execution

<svg id="svg"></svg>

<script>
var s = Snap("#svg");
s.attr({ viewBox: "0 0 500 130" });

var startx = 20 ;
var starty = 20 ;

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
var reg1=icsvg_reg(s,conf) ;

var conf={
  x: startx+130,
  y: starty,
  size: 50,
  color: "#123456",
  reset: -1,
  latch: true,
  triggle: 0,
  d_length: 28,
  q_length: 0,
  ck_to_q: true
} ;
var reg2=icsvg_reg(s,conf) ;

var conf={
  x: startx+80,
  y: starty,
  scale: 0.3
};

icsvg_logic(s,conf);

var conf={
  x: startx+80,
  y: starty+60,
  size: 18,
  type:"buffer",
  color:"#123456",
  orient:"r0"
};

var buf1=icsvg_repeater(s,conf);
var conf={
  x: startx-10,
  y: starty+60,
  size: 9,
  type:"buffer",
  color:"#123456",
  orient:"r270"
};

var buf2=icsvg_repeater(s,conf);

//console.log(buf1.A.x) ;

conf= {
  from:buf2.Z,
  to:reg1.CK,
  dir:"clockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;
conf= {
  from:buf2.A,
  to:buf1.A,
  dir:"clockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;conf= {
  from:buf1.Z,
  to:reg2.CK,
  dir:"anticlockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;

var tmp=s.circle(50,50,2);
tmp.click(function(){
  tmp.animate({cx: 90}, 30);
  //tmp.animate({
  //      fill: "#00f"
  //  }, 1500, mina.bounce, function() {
  //      console.log("animate") ;
  //  });
}) ;

</script>

$\Huge T\huge \scriptscriptstyle arrive \Huge = T\huge \scriptscriptstyle latency(launch) \Huge + T\huge \scriptscriptstyle ck\to q \Huge + T \huge \scriptscriptstyle prop \Huge + T \huge \scriptscriptstyle setup \newline \Huge T\huge \scriptscriptstyle require \Huge = T\huge \scriptscriptstyle latency(capture) \Huge + T \huge \scriptscriptstyle period(l\to c)$

$\Huge T\huge \scriptscriptstyle latency(launch) \Huge + T\huge \scriptscriptstyle ck\to q \Huge + T \huge \scriptscriptstyle prop \Huge + T \huge \scriptscriptstyle setup \Huge <= T\huge \scriptscriptstyle latency(capture) \Huge + T \huge \scriptscriptstyle period(l\to c) \newline \Huge T\huge \scriptscriptstyle skew \Huge = T\huge \scriptscriptstyle latency(capture) \Huge - T\huge \scriptscriptstyle latency(launch)\newline \Huge T\huge \scriptscriptstyle ck\to q \Huge + T \huge \scriptscriptstyle prop \Huge + T \huge \scriptscriptstyle setup \Huge <= T\huge \scriptscriptstyle skew \Huge + T \huge \scriptscriptstyle period(l\to c)$

> [!Note]
> $\Large T \large \scriptscriptstyle period$ means the period from launch clock edge to capture edge.
> 
> That may be one cycle of clock, half or 60% of clock cycle based on duty cycle.
