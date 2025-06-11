from flask import jsonify, session


class SessionManager:
    def initialize_session(self, user):
        del user['password']

        session['logged_in'] = True
        session['user'] = user
        session.permanent = True
        print("--- hey --")
        print(session.get('user'))
        return jsonify(user), 200

    def get_session(self):
        print("Session keys:", list(session.keys()))
        loggedIn = session.get('logged_in')
        user = session.get('user')
        print(loggedIn, user)
        if (loggedIn):
            return jsonify({'loggedIn': loggedIn, 'user' : user})
        
        return jsonify({'loggedIn': False})
