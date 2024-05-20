
const mines = [];
let root;
for (let i = 0; i < 4; i++) {
    mines[i] = [];
    for (let j = 0; j < 4; j++) {

        root = "bloco-" + i + "-" + j;


        let element = document.getElementById(root);

        mines[i][j] = element;

    }
    //veja quais inputs estao sendo atribuido console.log(mines);
}

let infos = {
    qtdMinas: 0,
    qtdAcertos: 0,
    qtdEstrela: 0
}

let rootClick;

let rowClicked;
let columnClicked;

let infoGame = document.getElementById('area-infoGame');


function play() {

    let undMine = document.getElementById('qtd-minas').value;

    if (undMine >= 1 && undMine <= 10) {
        infos.qtdMinas = undMine;
    } else if (undMine > 10) {
        infos.qtdMinas = 10;
    } else {
        infos.qtdMinas = 1;
    }



    infos.qtdEstrela = 16 - infos.qtdMinas;




    document.getElementById('area-mines').style.display = 'flex';
    document.getElementById('area-start').style.display = 'none';
    document.getElementById('area-infoGame').style.display = 'flex';



    defineMine();

    atualizarInfo();


}

let positionMine = [];

function defineMine() {
    /*linha e coluna que a bomba se encontrara*/


    //gerar bombas

    /*linha e coluna que a bomba se encontrara*/

    for (let index = 0; index < infos.qtdMinas;) {

        positionMine[index] = [];

        let isBombRepeat = false;

        let linha = Math.floor(Math.random() * 4);
        let coluna = Math.floor(Math.random() * 4);

        if (positionMine.length > 0 && infos.qtdMinas > 1) {
            for (let i = 0; i < index; i++) {


                if (positionMine[i][0] == linha && positionMine[i][1] == coluna) {
                    isBombRepeat = true;
                    /*
                    
                    teste console
                    console.log("bombRepeat looop", positionMine);
                    console.log("Tentei inserir:",linha,"-",coluna)*/
                    console.log("bombRepeat looop");
                }



            }
        }

        if (!isBombRepeat) {
            positionMine[index][0] = linha;
            positionMine[index][1] = coluna;

            index++;

        }

    }

    console.log("Posição das Minas:", positionMine);

}












function isValidaty() {
    for (let i = 0; i < infos.qtdMinas; i++) {
        let positionBomba = 0;
        if (positionMine[i][positionBomba] == rowClicked && positionMine[i][positionBomba + 1] == columnClicked) {


            /*bomb*/
            return false;

        }

    }

    return true;

}



function seleciona(rootClick) {

    rowClicked = rootClick.charAt(6);
    columnClicked = rootClick.charAt(8);

    console.log("rowclick:", rowClicked, "columnclick:", columnClicked);





    if (isValidaty()) {

        /*sucess*/

        mines[rowClicked][columnClicked].innerHTML = "<img  src='./assets/estrela.svg'>";
        mines[rowClicked][columnClicked].style.backgroundColor = "#002947";
        infos.qtdAcertos += 1;
        mines[rowClicked][columnClicked].disabled = 'true';

        if (infos.qtdAcertos == infos.qtdEstrela) {
            console.log(infos.qtdAcertos, infos.qtdEstrela)
            document.getElementById('sucess-game').style.display = 'flex';
        }

    } else {


        /*bomb*/

        mines[rowClicked][columnClicked].innerHTML = "<img  src='./assets/bomba.png'>";
        mines[rowClicked][columnClicked].style.backgroundColor = "#B61717";
        mines[rowClicked][columnClicked].disabled = 'true';


        document.getElementById('fail-game').style.display = 'flex';



    }


    document.getElementById('area-mines').style.display = 'none';
    atualizarInfo();

}








document.getElementById('btn-fail').addEventListener('click', function () {
    location.reload();


});
document.getElementById('btn-sucess').addEventListener('click', function () {
    location.reload();


});



function atualizarInfo() {

    document.getElementById('qtd.minas').innerText = infos.qtdMinas;
    document.getElementById('qtd.acertos').innerText = infos.qtdAcertos;
    document.getElementById('qtd.estrela').innerText = infos.qtdEstrela;

}
