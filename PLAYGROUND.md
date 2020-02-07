
<svg id="svg"></svg>

<script>
var s = Snap("#svg");
s.attr({ viewBox: "0 0 500 130" });

var startx = 50 ;
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
  latch: false,
  triggle: 1,
  d_length: 28,
  q_length: 0,
  ck_to_q: false
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
  var conf = {
    x: startx-20,
    y: starty+69,
    name: "CLK",
    position:"left",
    color:"#123456",
    size:3
  };

var clkp=icsvg_port(s,conf) ;

conf= {
  from:buf2.Z,
  to:reg1.CK,
  dir:"clockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;
conf= {
  to:clkp.OUT,
  from:buf1.A,
  dir:"clockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;
conf= {
  from:clkp.OUT,
  to:buf2.A,
  dir:"anticlockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;
conf= {
  from:buf1.Z,
  to:reg2.CK,
  dir:"anticlockwise",
  color:"#123456"
} ;
icsvg_connect(s,conf) ;

conf= {
  x:20,
  y:120,
  repeat:10,
  size:10,
  gated: 0,
  duty_cycle:0.3
}
icsvg_wave_clock(s,conf) ;
//var tmp=s.circle(50,50,2);
//tmp.click(function(){
//  tmp.animate({cx: 90}, 30);
//  //tmp.animate({
//  //      fill: "#00f"
//  //  }, 1500, mina.bounce, function() {
//  //      console.log("animate") ;
//  //  });
//}) ;

</script>

$\huge T\large \scriptstyle arrival \huge = T\large \scriptstyle latency(launch) \huge + T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop\newline \huge T\large \scriptstyle required \huge = T\large \scriptstyle latency(capture) \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup\newline \huge T\large \scriptstyle slack\huge = T\large \scriptstyle required \huge - T\large \scriptstyle arrival$

$\huge T\large \scriptstyle latency(launch) \huge + T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop \huge + T \large \scriptstyle uncertainty \huge <= T\large \scriptstyle latency(capture) \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup \newline \huge T\large \scriptstyle skew \huge = T\large \scriptstyle latency(capture) \huge - T\large \scriptstyle latency(launch)\newline \huge T\large \scriptstyle ck\to q \huge + T \large \scriptstyle prop \huge <= T\large \scriptstyle skew \huge + T \large \scriptstyle period(l\to c) \huge - T \large \scriptstyle setup$

> [!Note]
> $\Large T \large \scriptscriptstyle period$ means the period from launch clock edge to capture edge.
> 
> That may be one cycle of clock, half or 60% of clock cycle based on duty cycle.
