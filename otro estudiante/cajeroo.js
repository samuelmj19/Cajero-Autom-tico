class Billete
{
  constructor(v, c)
  {
    this.valor = v;
    this.cantidad = c;
    this.imagen = new Image();
    this.imagen.src = imagenes[this.valor];
  }
}

var imagenes = [];

imagenes["5000"] = "vaca.png";
imagenes["2000"] = "cerdo.png";
imagenes["1000"] = "pollo.png";

var caja = [];

caja.push( new Billete(5000, 15) );
caja.push( new Billete(2000, 15) );
caja.push( new Billete(1000, 10) );

var entregado = [];

var dinero;
var div;
var papeles;

var cantidad = document.getElementById("cantidad");
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");

b.addEventListener("click", entregarDinero);
cantidad.addEventListener("click", existencia);

function entregarDinero()
{
  resultado.innerHTML = "";
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);

  for(var b of caja)
  {
    if(dinero > 0)
    {
      div = Math.floor(dinero / b.valor);

      if(div > b.cantidad)
      {
        papeles = b.cantidad;
      }
      else
      {
        papeles = div;
      }
      entregado.push( new Billete(b.valor, papeles) );
      dinero -= (b.valor * papeles);

      b.cantidad -= papeles;
    }
  }

  if(dinero > 0)
  {
    resultado.innerHTML = "Soy un cajero <strong>malo</strong>, he sido <strong>malo</strong> y no puedo darte esa cantidad :( <br /><hr />";
  }
  else
  {
    resultado.innerHTML += "<p>Retiraste:<br /></p>";

    for(var e of entregado)
    {
      if(e.cantidad > 0)
      {
        resultado.innerHTML += e.cantidad + " billetes de $" + e.valor +"<br>"; 
      }
    }
  }
}

function existencia()
{
  var total = 0;

  for(var bi of caja)
  {
    total += bi.valor * bi.cantidad;
  }
  alert("La cantidad actual de dinero es de " + total + "$COP");
}