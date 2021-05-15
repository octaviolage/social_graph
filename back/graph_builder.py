# import pandas as pd # To structure and analysis data
import json

from twiteer_api import api


def handle_user(user: object):
    attributes = {
        'name': user.name,
        'screen_name': user.screen_name,
        'description': user.description,
        'location': user.location,
        'picture': user.profile_image_url_https
    }

    return attributes

# Metodo recursivo p/ criar lista de adjacencia e coletar dados de usuários próximos.
def build_adjacency_list(screen_name: str, adjacency_list = dict(), users = dict(), limit = 3):
    print('Iteração')
    # Verifica se o nome do usuário já esta no dicionário. Caso não esteja cria uma entrada p/ ele.
    if screen_name not in adjacency_list.keys():
        adjacency_list[screen_name] = []
    
    # Busca por usuários que o usuário atual segue.
    friends = api.friends(screen_name=screen_name)
    count = limit
    # Cada um dos amigos são adicionados na lista de adjacência e na base de usuários.
    for friend in friends:
        # Verifica se o amigo já não foi registrado.
        if friend.screen_name not in adjacency_list.keys():
            adjacency_list[screen_name].append(friend.screen_name)
            adjacency_list[friend.screen_name] = []
            users[friend.screen_name] = handle_user(friend)

            # Limita a quantidade de recursões. Limite igual a 3 significa ligações de até 4º grau.
            # Quanto menor o grau de ligação, menos amigos desse usuário serão encontrados.
            if limit > 0 and count > 1:
                count -= 1
                build_adjacency_list(friend.screen_name, adjacency_list, users, limit-1)
    
    return adjacency_list, users


# User that will get friends and followers
screen_name = 'lageoctavio'

adjacency_list, users = build_adjacency_list(screen_name)
# for x in users.values():
#     print(x)
#     print()

print(adjacency_list)
print()
for x in users:
    print(x)

try:
    with open('adj_list_X.json', 'x') as adj_list:
        json.dump(adjacency_list, adj_list)
except:
    print('Com x não foi')

try:
    with open('adj_list_W.json', 'w') as adj_list:
        json.dump(adjacency_list, adj_list)
except:
    print('Com w não foi')

with open('users.json', 'w') as json_file:
    json.dump(users, json_file)
