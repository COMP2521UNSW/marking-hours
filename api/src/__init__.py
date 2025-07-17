
import datetime
import os
import traceback

from flask import current_app, Flask, g, request

def create_app(test_config=None):
	app = Flask(
		__name__,
		instance_relative_config=True,
	)

	app.config.from_mapping(
		CONFIG_DIR=os.path.join(app.instance_path, 'config'),
		DATABASE=os.path.join(app.instance_path, 'marking-hours.db'),
		ERROR_LOG_DIR=os.path.join(app.instance_path, 'error-logs'),
	)

	if test_config is None:
		app.config.from_pyfile('config.py', silent=True)
	else:
		app.config.from_mapping(test_config)

	try:
		os.makedirs(app.instance_path)
	except OSError:
		pass

	from . import db
	db.init_app(app)

	from . import setup
	setup.init_app(app)

	from . import endpoints
	app.register_blueprint(endpoints.bp)

	@app.before_request
	def get_user():
		g.user = os.environ.get('REMOTE_USER', '').removeprefix('z')

	app.register_error_handler(500, internal_server_error)

	return app

########################################################################

def internal_server_error(exception):
	log_error(exception)
	return '', 500

def log_error(exception):
	time_str = datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%S-%f')
	log_path = f'{current_app.config["ERROR_LOG_DIR"]}/{time_str}.log'
	with open(log_path, 'w') as f:
		f.write(f'{exception}\n\n')
		f.write(f'{traceback.format_exc()}\n')
		f.write(f'Method: {request.method}\n')
		f.write(f'Path: {request.path}\n')
		f.write(f'Query string: {request.query_string.decode()}\n')
		f.write(f'Headers:\n{request.headers}\n')
		f.write(f'Body:\n{str(request.data.decode())}\n')

########################################################################
