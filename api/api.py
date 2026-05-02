from flask import Flask, jsonify
from flask_cors import CORS
import random as rd
import os

app = Flask(__name__)
CORS(app)

#Global variables :
musics = []
current_music = 0
current_playlist = ""
number_musics = 0
old_musics = []

def get_current_music():
    global current_music
    return current_music

def get_current_playlist():
    global current_playlist
    return current_playlist

def get_musics():
    global musics
    return musics

def get_number_musics():
    global number_musics
    return number_musics

def get_old_musics():
    global old_musics
    return old_musics

def set_current_music(n):
    global current_music
    current_music = n

def set_current_playlist(name):
    global current_playlist
    current_playlist = name

def set_musics(music):
    global musics
    musics = music.copy()

def set_number_musics(n):
    global number_musics
    number_musics = n

def reset_old_musics():
    global old_musics
    old_musics = []

def add_music_to_old_musics(e):
    global old_musics
    old_musics.append(e)

#Get Services

@app.route('/playlists', methods=['GET'])
def get_playlists():
    directory_path = "/app/music" #path in container
    folders = [entry for entry in os.listdir(directory_path) 
    if os.path.isdir(os.path.join(directory_path, entry))]
    return jsonify({'playlists': folders})

@app.route('/music/<playlist>', methods=['GET'])
def get_music(playlist):
    directory_path = "/app/music/" + playlist
    music = [entry for entry in os.listdir(directory_path) 
    if os.path.isfile(os.path.join(directory_path, entry))]
    return jsonify({"music": music})

@app.route('/next-music', methods=['GET'])
def get_next_music():
    if len(get_old_musics()) - 2 >= get_number_musics():
        set_number_musics(get_number_musics() + 1)
        return jsonify({"music": get_old_musics()[get_number_musics()][0], "playlist": get_old_musics()[get_number_musics()][1]})
    else:
        set_current_music(get_current_music() + 1)
        if get_current_music() == len(musics):
            set_current_music(0)
        add_music_to_old_musics((get_musics()[get_current_music()], get_current_playlist()))
        set_number_musics(get_number_musics() + 1)
        return jsonify({"music": get_musics()[get_current_music()], "playlist": get_current_playlist()})

@app.route('/previous-music', methods=['GET'])
def get_previous_music():
    if get_number_musics() < 0:
        return "", 204
    set_number_musics(get_number_musics() - 1)
    if get_number_musics() < 0:
        set_number_musics(0)
    return jsonify({"music": get_old_musics()[get_number_musics()][0], "playlist": get_old_musics()[get_number_musics()][1]})

@app.route('/music-played', methods=['GET'])
def get_music_played():
    if len(get_old_musics()) - 1 >= get_number_musics():
        print("yes")
        return jsonify({"music": get_old_musics()[get_number_musics()][0]})
    elif len(get_musics()) > 0:
        return jsonify({"music": get_musics()[get_current_music()]})
    else:
        return jsonify({"music": "Pas de musique jouée pour le moment"})


#Put Services

@app.route('/play/<playlist>', methods=['PUT'])
def start_playlist(playlist):
    #get all musics
    directory_path = "/app/music/" + playlist
    music = [entry for entry in os.listdir(directory_path) 
    if os.path.isfile(os.path.join(directory_path, entry))]
    rd.shuffle(music)
    set_musics(music)
    set_current_music(0)
    set_current_playlist(playlist)
    set_number_musics(0)
    reset_old_musics()
    add_music_to_old_musics((get_musics()[0], playlist))
    return jsonify({"music": get_musics()[0]})

@app.route('/force-music/<playlist>/<music>', methods=['PUT'])
def force_music(playlist, music):
    set_number_musics(get_number_musics() + 1)
    add_music_to_old_musics((music, playlist))
    return "", 204

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)