import os
import random as rd

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Get Services


@app.route("/playlists", methods=["GET"])
def get_playlists():
    directory_path = "../public/music"  # path in container
    folders = [
        entry
        for entry in os.listdir(directory_path)
        if os.path.isdir(os.path.join(directory_path, entry))
    ]
    return jsonify({"playlists": folders})


@app.route("/music/<playlist>", methods=["GET"])
def get_music(playlist):
    directory_path = "../public/music/" + playlist
    music = [
        entry
        for entry in os.listdir(directory_path)
        if os.path.isfile(os.path.join(directory_path, entry))
    ]
    rd.shuffle(music)
    return jsonify({"music": music})


@app.route("/musics", methods=["GET"])
def get_musics():
    directory_path = "../public/music"  # path in container
    playlists = [
        entry
        for entry in os.listdir(directory_path)
        if os.path.isdir(os.path.join(directory_path, entry))
    ]
    musics = []
    for playlist in playlists:
        musicList = [
            entry
            for entry in os.listdir(directory_path + "/" + playlist)
            if os.path.isfile(os.path.join(directory_path + "/" + playlist, entry))
        ]
        elem = {"playlist": playlist, "musicList": musicList}
        musics.append(elem)
    return jsonify({"musics": musics})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
