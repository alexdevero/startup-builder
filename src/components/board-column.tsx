import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

import { BoardItem } from './board-item'

type BoardColumnProps = {
  key: string,
  column: any,
  items: any,
}

type BoardColumnContentProps = {
  isDraggingOver: boolean
}

const BoardColumnWrapper = styled.div`
  flex: 1;
  padding: 8px;
  background-color: #e5eff5;
  border-radius: 4px;

  & + & {
    margin-left: 12px;
  }
`

const BoardColumnTitle = styled.h2`
  font: 14px sans-serif;
  margin-bottom: 12px;
`

const BoardColumnContent = styled.div<BoardColumnContentProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#aecde0' : ''};
  border-radius: 4px;
`

export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  return(
    <BoardColumnWrapper>
      <BoardColumnTitle>
        {props.column.title}
      </BoardColumnTitle>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}
