import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

type BoardItemProps = {
  index: number
  item: any
}

type BoardItemElProps = {
  isDragging: boolean
}

const BoardItemEl = styled.div<BoardItemElProps>`
  padding: 8px;
  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#fff'};
  border-radius: 4px;
  transition: background-color .25s ease-out;

  &:hover {
    background-color: #f7fafc;
  }

  & + & {
    margin-top: 4px;
  }
`

export const BoardItem = (props: BoardItemProps) => {
  return <Draggable draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {props.item.content}
      </BoardItemEl>
    )}
  </Draggable>
}
