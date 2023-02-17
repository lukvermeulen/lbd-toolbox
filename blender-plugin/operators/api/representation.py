import requests
from . import config

# meshes


def list_meshes():
    path = "representation.mesh.list"

    r = requests.get(config.API_URL + path)

    return r.text


def add_mesh(name, file_url):
    path = "representation.mesh.add?batch=1"

    payload = {
        "0": {
            "name": name,
            "fileUrl": file_url
        }
    }

    r = requests.post(config.API_URL + path, json=payload)

    return r.text

# breps


def list_breps():
    path = "representation.mesh.list"

    r = requests.get(config.API_URL + path)

    return r.text


def add_brep(name, file_url):
    path = "representation.mesh.add?batch=1"

    payload = {
        "0": {
            "name": name,
            "fileUrl": file_url
        }
    }

    r = requests.post(config.API_URL + path, json=payload)

    return r.text

# representation


def represented_by(element, representation, status):
    path = "representation.representedBy?batch=1"

    payload = {
        "0": {
            "element": element,
            "representation": representation,
            "status": status
        }
    }

    r = requests.post(config.API_URL + path, json=payload)

    return r.text
