import { useState } from 'react'
import './App.scss'


const App = () => {
    const [boards, setBoards] = useState([
        {
            id: 1, title: "Сделать", items: [
                {id: 1, title: 'Пойти в магизин'},
                {id: 2, title: 'Пойти пойграть футбол'},
                {id: 3, title: 'Пойти полить огород'},
            ]
        },
        {
            id: 2, title: "Проверить", items: [
                {id: 4, title: 'Код ревью'},
                {id: 5, title: 'Ребенка'},
                {id: 6, title: 'Есть ли еда в холодильнеке'},
            ]
        },
        {
            id: 3, title: "Сделано", items: [
                {id: 7, title: 'Убрался дома'},
                {id: 8, title: 'Ремонт на кухне'},
                {id: 9, title: 'Приготовил покушать'},
            ]
        }

    ])
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragOverHandler(e) {
        e.preventDefault()
        if (e.target.className === 'App__board__item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }

    }
console.log('currentBoard',currentBoard)
    function dragLeaveHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e, board, i) {
        setCurrentBoard(board)
        setCurrentItem(i)
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dropHandler(e, board, item) {

        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentItem.id) {
                return currentItem
            }
            return b
        }))
        e.target.style.boxShadow = 'none'

    }


    function dropCardHandler(e, board) {
        
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentItem.id) {
                return currentItem
            }
            return b
        }))
    }


    return (
        <div className="App">
            {boards.map(board =>
                <div
                    key={board.id}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                    className="App__board">
                    <div className="App__board__title">
                        {board.title}
                    </div>
                    {board.items.map(i =>
                        <div
                            key={i.id}
                            onDragOver={(e) => dragOverHandler(e)}
                            onDragLeave={(e) => dragLeaveHandler(e)}
                            onDragStart={(e) => dragStartHandler(e, board, i)}
                            onDragEnd={(e) => dragEndHandler(e)}
                            onDrop={(e) => dropHandler(e, board, i)}
                            draggable={true}
                            className="App__board__item"

                        >{i.title}</div>)}
                </div>)}

        </div>
    )
}

export default App