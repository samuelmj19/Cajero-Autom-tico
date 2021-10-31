class Billetes
{
  constructor(n, v, c)
  {
    this.nombre = n;
    this.valor = v;
    this.cantidad = c;
    this.image = new Image();
    this.image.src = images[this.nombre];
  }
}

var images = [];
images["100.000"] = "100.jpg";
images["50.000"] = "50.jpg";
images["20.000"] = "20.jpg";
images["10.000"] = "10.jpg";

var dinero_1 = document.getElementById('dinero');
var sold = document.getElementById('saldo');
var r = document.getElementById('resultado');
var r1 = document.getElementById('resultado1');
var div_i = document.getElementById('imagen');
var extraer_1 = document.getElementById('extraer');
extraer_1.addEventListener("click", transaccion);

var box = [];
box.push(new Billetes("100.000", 100000, 23));
box.push(new Billetes("50.000", 50000, 48));
box.push(new Billetes("20.000", 20000, 41));
box.push(new Billetes("10.000", 10000, 48));

var j = 0;
var p = 0;
for (var s of box)
{
  j += parseInt(s.cantidad * s.valor);
  p += parseInt(s.cantidad * s.valor);
  sold.innerHTML = "<font size=5> Saldo del Cajero: $" + j + "</font>" ;
}

var retirado = [];
var entregado = [];
var papeles = 0;

function transaccion()
{
  var money = parseInt(dinero_1.value);
  if (money > 500000)
  {
    r.innerHTML = "";
    r1.innerHTML = "<font size=4> Recuerde que la máxima cantidad de dinero que se puede retirar en una </font> </br>";
    r1.innerHTML += "<font size=4> sola transaccion es de: $500.000. </font>"
  }
  else
  {
    for (var b of box)
    {
      if( money > 0)
      {
        var div = Math.floor(money / b.valor);

        if(div > b.cantidad)
        {
          papeles = b.cantidad;
        }
        else
        {
          papeles = div;
        }
        entregado.push( new Billetes(b.nombre, b.valor, papeles) );
        money -= (b.valor * papeles);
        var t = j - dinero_1.value;
      }
    }
    if (money > 0)
    {
      r.innerHTML = "";
      r1.innerHTML = "<font size=4> Lo siento, la cantidad que desea retirar no es compatible con el valor de los billetes. </font> <br/>";
      r1.innerHTML += "</br> <font size=4> Recuerde que el valor del billete de menor denominación es de: $10.000. </font>";
    }
    else if (money <= t)
    {
      var m = parseInt(dinero_1.value);
      retirado.push(m);
      for (var e of entregado)
      {
        if(e.cantidad > 0)
        {
          if (t + m == p)
          {
            r1.innerHTML = "";
          }
          else
          {
            r1.innerHTML = "El Ultimo retiro fue de: $" + retirado[0];
          }
          r.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br/> <br/>";
          for (var i = 0; i < e.cantidad; i++)
          {
            r.appendChild(e.image);
            if (e.valor == e.valor)
            {
              r.innerHTML += " ";
            }
            else
            {
              r.innerHTML += "<br/>";
            }
          }
          r.innerHTML += "<br/><br/>";
        }
      }
      todayDate(r);
      sold.innerHTML = "<font size=5> Saldo del Cajero: $" + t + "</font>";
    }
    else if (money > t)
    {
      sold.innerHTML = "<font size=5> Saldo del Cajero: $" + j + "</font>";
      r.innerHTML = "";
      r1.innerHTML = "<font size=4> Lo sentimos, la cantidad que desea retirar excede la disponibilidad de dinero en el cajero. </font> <br/>";
      r1.innerHTML += "</br> <font size=4> O el cajero no dispone de más dinero. </font>";
      t = j;
    }
    j = t;
  }
}

function clean()
{
  lastTransaction();
  entregado.splice(0,entregado.length);
  document.getElementById('formulario').reset();
  r.innerHTML = "";
  r1.innerHTML = "";
  return true;
}

function resetAll()
{
  clean()
  retirado.splice(0,retirado.length);
  var h = 0;
  for (var l of box)
  {
    h += parseInt(l.cantidad * l.valor);
    sold.innerHTML = "<font size=5> Saldo del Cajero: $" + h + "</font>";
    j = h;
  }
}

function todayDate(v)
{
  var today = new Date();
  var dia = today.getDate();
  var month = today.getMonth() + 1;
  var months = (month < 10) ? "0" + month : month;
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var minutes = (minute < 10) ? "0" + minute : minute;
  var second = today.getSeconds();
  var seconds = (second < 10) ? "0" + second : second;
  v.innerHTML += "<strong> Fecha: </strong>" + dia +  "/" + months + "/" + year + "<strong> Hora: </strong>" + hour + ":" + minutes + ":" + seconds;
}

function lastTransaction()
{
  var h = parseInt(dinero_1.value);
  if (h > 500000)
  {
    retirado.splice(0,0);
  }
  else if (h <= j)
  {
    retirado.splice(0,retirado.length, h);
  }
  else if (h > j)
  {
    retirado.splice(0,retirado.length, retirado[retirado.length - 1]);
    retirado.splice(0,0,retirado[0]);
  }
}