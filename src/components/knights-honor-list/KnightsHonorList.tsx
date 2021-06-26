import React from 'react';
import {Container, Segment, Header} from 'semantic-ui-react';
import {Character} from '../../App';
import './KnightsHonorList.css'

interface KnightsHonorListProps{
    character: Character;
};

export function KnightsHonorList(props: KnightsHonorListProps) {
 const itemMap = new Map(props.character.items.map(i => ([i])));
 return (
     <Container className='knights-honor-list'>
         <Segment>
            <Header as='h1'>{props.character.name}</Header>
         </Segment>
     </Container>
 )
}