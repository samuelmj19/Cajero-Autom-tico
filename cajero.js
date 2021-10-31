class Billete
{
	constructor (v, c)
	{
		this.valor = v;
		this.cantidad = c;

	}
}

var caja = [];
var entregado = [];
caja.push(new Billete(100,5) );
caja.push(new Billete(50,20) );
caja.push(new Billete(20,30) );
caja.push(new Billete(10,5) );
caja.push(new Billete(5,5) );
caja.push(new Billete(1,10) );

var dinero = 0;
var div = 0;
var papeles = 0;
var resultado = document.getElementById("resultado");

var b = document.getElementById('boton');
b.addEventListener("click", entrgarDinero);
var saldo = document.getElementById("saldo");
saldo.addEventListener("click", mostrarSaldo);



function entrgarDinero()
{
	resultado.innerHTML = "";
	var t = document.getElementById("dinero");
	dinero = parseInt(t.value);

	for (var b of caja)
	{

		if (dinero > 0)
		{
			div = Math.floor(dinero / b.valor);
			if (div > b.cantidad) 
			{
				papeles = b.cantidad;
			}
			else 
			{
				papeles = div;
			}

			entregado.push(new Billete(b.valor, papeles) );
			dinero = dinero - (b.valor * papeles)

			b.cantidad -= papeles;

		}


	}
	if (dinero > 0)
	{
		resultado.innerHTML = "No puedes perdir esa cantindad.";
	}
	else
	{
 		for (var e of entregado)
 		{
 			if (e.cantidad > 0) 
 			{
 				resultado.innerHTML += e.cantidad + " billetes de $" + e.valor +"<br>";	
 			}
 			
 		}
	}
	

}

function mostrarSaldo()
{
	var total = 0;
	for ( var sa of caja)
	{
		total += sa.cantidad * sa.valor;
		
	}
	alert(total);	
}


