import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.h1`
    color: var(--extraLightGray);
    font-size: 24px;
`;

const Container = styled.div`
    margin: 2%;
`;

const Grid = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 30px;
`;

const Card = styled.div`
    display: flex;
    padding: 5px;
    max-width: 300px;
`;

Card.Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

Card.Name = styled.p`
    padding: 0;
    margin: 0;
    margin-left: 5px;
    color: var(--extraLightGray);
`;

Card.Username = styled.p`
    padding: 0;
    margin: 0;
    margin-left: 5px;
    color: var(--lightGray);
`;

function Friends({nodes}) {
    const recommended = nodes.filter(user => user.relevance === 2);
    const maybeKnow = nodes.filter(user => user.relevance === 1);

    return (
        <Container>
            <SubTitle>Usuários recomendados</SubTitle>
            <Grid>
                {recommended.map((user, key) => 
                    <Card key={key}>
                        <Card.Image alt={user.id} src={user.image}/>
                        <div>
                            <Card.Name>{user.name}</Card.Name>
                            <Card.Username>@{user.id}</Card.Username>
                        </div>
                    </Card>
                )}
            </Grid>
            <SubTitle>Outros usuários que talvez conheça</SubTitle>
            <Grid>
            {maybeKnow.map((user, key) => 
                <Card key={key}>
                    <Card.Image alt={user.id} src={user.image}/>
                    <div>
                        <Card.Name>{user.name}</Card.Name>
                        <Card.Username>@{user.id}</Card.Username>
                    </div>
                </Card>
            )}
            </Grid>
        </Container>
    );
}

export default Friends;