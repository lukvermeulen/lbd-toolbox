import requests
from . import config


def list_elements():
    path = "element.list"

    r = requests.get(config.API_URL + path)

    return r.text


def add_element(name, buildingelementClass):
    path = "element.add?batch=1"

    payload = {
        "0": {
            "name": name,
            "buildingelementClass": buildingelementClass
        }
    }

    r = requests.post(config.API_URL + path, json=payload)

    return r.text
