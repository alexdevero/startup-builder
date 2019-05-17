import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

type ColumnItemProps = {
  index: any,
  item: any
}

type ColumnItemElProps = {
  isDragging: boolean
}

const ColumnItemEl = styled.div<ColumnItemElProps>`
  background-color: ${(props) => props.isDragging ? '#eee' : '#fff'};

  & + & {
    margin-top: 4px;
  }
`

export const ColumnItem: React.FC<ColumnItemProps> = (props) => {
  return <Draggable draggableId={props.item.id} index={props.index}>
    {(provided, snapshot) => (
      <ColumnItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {props.item.content}
      </ColumnItemEl>
    )}
  </Draggable>
}
