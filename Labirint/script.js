const board = () => {
    let bounce = document.querySelector('.bounce');
    for (let i = 0; i < 100; i++) {
        let area = document.createElement('div');
        area.classList.add('area');
        document.querySelector('.container').appendChild(area);
    }
    startAndEndPos()
    moveBounce(bounce)
    wall()
}

const moveBounce = (elem) => {
    let arr = [40];
    let arrLeft = [0];
    let currenPos = 81;
    let wall = document.querySelector('.main').children;
    let result = document.querySelector('h1');
    document.querySelector('.controls').addEventListener('click', (e) => {
        let bottomMove = arr[arr.length - 1] + 40;
        let leftMove = arrLeft[arrLeft.length - 1] + 40;
        if (e.target.getAttribute('data-move') == 'up') {
            currenPos -= 10;
            if (wall[currenPos].getAttribute('data-area') == 'wall' || wall[currenPos].getAttribute('class') !== 'area') {
                elem.setAttribute('style', 'bottom:40px; left:0px')
                arr = [40];
                arrLeft = [0];
                result.innerText = 'Game Over.. Reload page'
                document.querySelector('.controls').style.display = 'none';
                return 0;
            }
            leftMove -= 40;
            arr.push(bottomMove)
            elem.setAttribute('style', `bottom: ${bottomMove}px; left:${leftMove}px`);
        } else if (e.target.getAttribute('data-move') == 'down') {
            currenPos += 10;
            leftMove -= 40;
            bottomMove -= 80;
            if (wall[currenPos].getAttribute('data-area') == 'wall' || bottomMove < 0) {
                elem.setAttribute('style', 'bottom:40px; left:0px');
                arr = [40];
                arrLeft = [0];
                result.innerText = 'Game Over.. Reload page'
                document.querySelector('.controls').style.display = 'none';
                return 0;
            }
            arr.push(bottomMove)
            elem.setAttribute('style', `bottom: ${bottomMove}px; left:${leftMove}px`);
        } else if (e.target.getAttribute('data-move') == 'right') {
            currenPos += 1;
            bottomMove -= 40;
            if (wall[currenPos].getAttribute('data-area') == 'wall' || leftMove == 400) {
                elem.setAttribute('style', 'bottom:40px; left:0px');
                arr = [40];
                arrLeft = [0];
                result.innerText = 'Game Over.. Reload page'
                document.querySelector('.controls').style.display = 'none';
                return 0;
            }
            arrLeft.push(leftMove);
            elem.setAttribute('style', `left: ${leftMove}px;bottom: ${bottomMove}px;`);
        } else if (e.target.getAttribute('data-move') == 'left') {
            currenPos -= 1;
            bottomMove -= 40;
            leftMove -= 80
            if (wall[currenPos].getAttribute('data-area') == 'wall' || leftMove == (-40)) {
                elem.setAttribute('style', 'bottom:40px; left:0px');
                arr = [40];
                arrLeft = [0];
                result.innerText = 'Game Over.. Reload page'
                document.querySelector('.controls').style.display = 'none';
                return 0;
            }
            arrLeft.push(leftMove);
            elem.setAttribute('style', `left: ${leftMove}px;bottom: ${bottomMove}px;`);
        }
        checkWinner(wall, currenPos);
    })
    return arr
}

const startAndEndPos = () => {
    let board = document.querySelectorAll('.area')
    board[80].style.backgroundColor = 'red';
    board[80].setAttribute('data-area', 'start');
    board[19].style.backgroundColor = 'green';
    board[19].setAttribute('data-area', 'exit');
}


const checkWinner = (area, pos) => {
    if (area[pos].getAttribute('data-area') == 'exit') {
        document.querySelector('h1').innerText = 'You Win!!!';
        document.querySelector('.controls').style.display = 'none';
        return 0;
    }
}

const wall = () => {
    document.querySelector('.wall').addEventListener('click', () => {
        document.querySelector('.main').addEventListener('click', (e) => {
            e.target.style.backgroundColor = 'darkgrey';
            e.target.setAttribute('data-area', 'wall');
        })
    })
}


board()