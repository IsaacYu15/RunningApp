from app import app
from session.models import SessionManager

sessionManager = SessionManager()

@app.route('/fetchSession', methods=["GET"])
def get_session():
    return sessionManager.get_session()