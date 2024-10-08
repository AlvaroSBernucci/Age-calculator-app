const btnSubmit = document.querySelector('button');
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input[type="number"]');

// Extrair a informação do DOM
function validarData(event){
  event.preventDefault();
  let dataNascimento = null;
  let dataValidacao = [1,12,1900];
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input,index) => {
    dataValidacao[index] = input.value;
    dataValidacao = dataValidacao.reverse();
    const novaData = dataValidacao.join('-');
    dataNascimento = new Date(novaData);
    if(isNaN(dataNascimento)){
      input.previousElementSibling.classList.add('ativo');
      input.nextElementSibling.classList.add('ativo');
      input.classList.add('ativo');
      dataValidacao = [1,12,1900]
    } else{
      dataValidacao.reverse();
      input.previousElementSibling.classList.remove('ativo');
      input.nextElementSibling.classList.remove('ativo');
      input.classList.remove('ativo');
    }
  })
  validarAno();
  calcularIdade(dataNascimento);
}

function validarAno(){
  const inputAno = document.getElementById('year');
  const ano = +inputAno.value;
  const anoAtual = new Date().getFullYear();
  if(ano > anoAtual){
    inputAno.previousElementSibling.classList.add('ativo');
    inputAno.nextElementSibling.classList.add('ativo');
    inputAno.classList.add('ativo')
  }else{
    inputAno.previousElementSibling.classList.remove('ativo');
    inputAno.nextElementSibling.classList.remove('ativo');
    inputAno.classList.remove('ativo')
  }
}




function calcularIdade(dataNascimento){
  const erro = document.querySelectorAll('.erro.ativo');

  if(!erro.length){
    const dataAtual = new Date();
    const dataAtualMs = dataAtual.getTime();
    const dataNascimentoMs = dataNascimento.getTime();
    calcularAnoMesesDias(dataAtualMs,dataNascimentoMs);
  }
}


btnSubmit.addEventListener('click',validarData);



// Extrair a informação do DOM

// Calcular a idade
function calcularAnoMesesDias(dataAtualMs,dataNascimentoMs){
  function converterDias(data){
    return data / (24 * 60 * 60 * 1000);
  }
  const dataAtualDias = converterDias(dataAtualMs);
  const dataNascimentoDias = converterDias(dataNascimentoMs);
  const diasTotais = dataAtualDias - dataNascimentoDias;
  const diasPorAno = 365.25
  const diasPorMes = 30.44

  let anos = Math.floor(diasTotais / diasPorAno);
  let diasRestantes = diasTotais % diasPorAno;

  let meses = Math.floor(diasRestantes/diasPorMes);
  diasRestantes = diasRestantes % diasPorMes;

  let dias = Math.floor(diasRestantes);
  const resultadoFinal = [anos,meses,dias];
  resultado(resultadoFinal);
}
// Extrair a informação do DOM


// Adicionar o resultado no DOM
function resultado(resultadoFinal){
  const dataResultado = document.querySelectorAll('[data-resultado]');
  
  dataResultado.forEach((resultado,index) => {
    const incremento = resultadoFinal[index] / 200; 
    let i = 0;
    const teste = setInterval(() =>{
      i = i + incremento;
      resultado.innerText = parseInt(i);
      if(i > resultadoFinal[index]){
        resultado.innerText = resultadoFinal[index];
        clearInterval(teste)
      };
    });
  });
}
// Adicionar o resultado no DOM


function handleChange(event){
  const name = event.target.name;
  const value = event.target.value; 
  saveValues(name,value);
  console.log(event)
}

function saveValues(name,value){
  localStorage[name] = value;
}

form.addEventListener('change',handleChange);


function setValues(){
  const propriedades = Object.keys(localStorage);
  propriedades.forEach((propriedade) => {
    console.log(localStorage[propriedade])
    form.elements[propriedade].value  = localStorage[propriedade];
  })
}
setValues();
