import os

PROJECT_NAME = "asceticism"

SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")

API_V1_STR = "/api/v1"

GITHUB_APP_ID = "c42ead5bc537447a0cd0"
GITHUB_APP_SECRET = os.getenv("GITHUB_APP_SECRET")
GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_USER_API = "https://api.github.com/user"
GITHUB_USER_EMAILS = "https://api.github.com/user/emails"
