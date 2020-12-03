from flask import Flask, request
from flask_restful import Resource, Api
import requests

app = Flask(__name__)
api = Api(app)

class UrlExpander(Resource):
    def post(self):
        data = request.get_json()
        link = ''
        if data:
            link = data.get('link', '')
            link = requests.get(link).url
            return {"link": link, "status": 201}
        return {"link": link, "status": 404}

api.add_resource(UrlExpander, '/')

if __name__ == '__main__':
    app.run(debug=True)
