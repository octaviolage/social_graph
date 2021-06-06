const SERVER_URL = 'http://localhost:5000/api/v1';

export async function getFriendsGraph(username){
    var usernameData = {
        username: `${username}`
    }

    var data = new FormData();
    data.append( "json", JSON.stringify( usernameData ) );

    const graph = await fetch(`${SERVER_URL}/graph/friends`,
        {
            method: "POST",
            body: data
        })
        .then((response) => {
            if (response.status === 200) {
                console.log('Sucesso!')
                console.log(response)
                return response.json();
            }
            else if (response.status === 206) {
                console.log('Retornando dados de backup');
                console.log(response);
                return response.json();
            }
            else {
                console.log('Erro de comunicação com a API');
                console.log(response);
                return {};
            }
        });
    return graph;
}