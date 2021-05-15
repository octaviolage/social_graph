import json

class User:
    def __init__(self, user_data: object):
        self.name = user_data.name
        self.screen_name = user_data.screen_name
        self.description = user_data.description
        self.location = user_data.location
        self.picture = user_data.profile_image_url_https
        # self.following = set()

    
    # def __str__(self):
    #     seguidores = ''
    #     for user in self.following:
    #         seguidores += f' {user} |'
    #     return self.screen_name + ' segue ' + seguidores

    def __str__(self):
        return json.dump(self)