import json
import configparser # Used to read .ini files

from tweepy import API, OAuthHandler # Lib to fetch twitter data

class GraphBuilder():
    def __init__(self):
        # Read in configs
        configs = configparser.ConfigParser()
        configs.read('./config.ini')
        keys = configs['TWITTER']
        consumer_key = keys['CONSUMER_KEY']
        consumer_secret = keys['CONSUMER_SECRET']
        access_token = keys['ACCESS_TOKEN']
        access_secret = keys['ACCESS_SECRET']

        # Authenticate Tweepy connection to Twitter API
        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_secret)
        # api = API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
        self.__api = API(auth)


    def __handle_user(self, user: object):
        attributes = {
            'name': user.name,
            'screen_name': user.screen_name,
            'description': user.description,
            'location': user.location,
            'picture': user.profile_image_url_https
        }

        return attributes

    # Metodo recursivo p/ criar lista de adjacencia e coletar dados de usuários próximos.
    def __get_friends_data(self, screen_name: str, adjacency_list = dict(), users = dict(), limit = 3):
        # Verifica se o nome do usuário já esta no dicionário. Caso não esteja cria uma entrada p/ ele.
        if screen_name not in adjacency_list.keys():
            adjacency_list[screen_name] = []
            users[screen_name] = self.__handle_user(self.__api.get_user(screen_name))
        
        # Busca por usuários que o usuário atual segue.
        friends = self.__api.friends(screen_name=screen_name, skip_status=True)
        count = limit
        # Cada um dos amigos são adicionados na lista de adjacência e na base de usuários.
        for friend in friends:
            # Verifica se o amigo já não foi registrado.
            if friend.screen_name not in adjacency_list.keys():
                adjacency_list[screen_name].append(friend.screen_name)
                adjacency_list[friend.screen_name] = []
                users[friend.screen_name] = self.__handle_user(friend)

                # Limita a quantidade de recursões. Limite igual a 3 significa ligações de até 4º grau.
                # Quanto menor o grau de ligação, menos amigos desse usuário serão encontrados.
                if limit > 0 and count > 1:
                    count -= 1
                    self.__get_friends_data(friend.screen_name, adjacency_list, users, limit-1)
        
        return adjacency_list, users


    def get_rate_limit_status(self):
        return self.__api.rate_limit_status()


    def get_friends_graph(self, username: str):

        adjacency_list, users = self.__get_friends_data(username)
        graph = {'nodes': [], 'links': [], 'focusedNodeId': username}
        # try:
        #     for user, links in adjacency_list.items():
        #         graph['nodes'].append(
        #             {
        #                 'id': user,
        #                 'svg': users[user]['picture']
        #             }
        #         )
        #         [graph['links'].append(x) for x in links]
        # except:
        #     with open('graph.json', 'r') as graph_json:
        #         return graph_json, 206
        for user, follows in adjacency_list.items():
            graph['nodes'].append( 
                { 'id': user, 'svg': users[user]['picture'] } 
            )
            for follow in follows:
                graph['links'].append( 
                    { 'source': user, 'target': follow } 
                )

        with open('graph.json', 'w') as json_file:
            json.dump(graph, json_file)

        with open('adj_list.json', 'w') as adj_list:
            json.dump(adjacency_list, adj_list)

        with open('users.json', 'w') as json_file:
            json.dump(users, json_file)

        return graph, 200
