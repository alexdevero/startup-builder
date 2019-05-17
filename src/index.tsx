import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DragDropContext } from 'react-beautiful-dnd'
// import styled from 'styled-components'

import { initialBoardData } from './data/board-initial-data'

import { Column } from './components/column'

const boardStyles = () => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '10px'
})

class App extends React.Component {
  state = initialBoardData

  onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const columnFinish = this.state.columns[destination.droppableId]
    const columnStart = this.state.columns[source.droppableId]

    // Moving items in the same list
    if (columnStart === columnFinish) {
      const newItemsIds = Array.from(columnStart.itemsIds)

      newItemsIds.splice(source.index, 1)
      newItemsIds.splice(destination.index, 0, draggableId)

      const newColumnStart = {
        ...columnStart,
        itemsIds: newItemsIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart
        }
      }

      this.setState(newState)
    } else {
      // Moving items from one list to another
      const newStartItemsIds = Array.from(columnStart.itemsIds)

      newStartItemsIds.splice(source.index, 1)

      const newColumnStart = {
        ...columnStart,
        itemsIds: newStartItemsIds
      }

      const newFinishItemsIds = Array.from(columnFinish.itemsIds)
      newFinishItemsIds.splice(destination.index, 0, draggableId)

      const newColumnFinish = {
        ...columnFinish,
        itemsIds: newFinishItemsIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumnStart.id]: newColumnStart,
          [newColumnFinish.id]: newColumnFinish
        }
      }

      this.setState(newState)
    }
  }

  render() {
    return(
      <div style={boardStyles()}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.columnsOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const items = column.itemsIds.map(itemId => this.state.items[itemId])

            return <Column key={column.id} column={column} items={items} />
          })}
        </DragDropContext>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
