import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { ColumnItem } from './column-item'

type ColumnProps = {
  key: string,
  column: any,
  items: any,
}

type ColumnElProps = {
  isDraggingOver: boolean
}

const ColumnEl = styled.div<ColumnElProps>`
  padding: 8px;
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? 'lightblue' : '#eee'};
`

export const Column: React.FC<ColumnProps> = (props) => {
  return(
    <div>
      <h2>
        {props.column.title}
      </h2>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <ColumnEl
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => <ColumnItem key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </ColumnEl>
        )}
      </Droppable>
    </div>
  )
}
