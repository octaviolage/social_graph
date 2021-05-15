import configparser # Used to read .ini files
from tweepy import API, OAuthHandler # Lib to fetch twitter data


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
api = API(auth)


if __name__ == '__main__':
    print(api.rate_limit_status())