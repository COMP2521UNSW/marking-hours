
import os
import shutil

import click
from flask import current_app

from . import config
from . import db

def init_app(app):
	app.cli.add_command(setup_app)

@click.command('setup')
def setup_app():
	click.echo('Setting up the app...')
	setup_config()
	setup_db()
	setup_error_log_dir()

def setup_config():
	config_path = current_app.config['CONFIG_DIR']
	if os.path.exists(config_path):
		if click.confirm(
			'A config directory already exists. Would you like to create a new '
			'config directory?'
		):
			backup_config()
			config.init_config()
	else:
		config.init_config()

def backup_config():
	config_path = current_app.config['CONFIG_DIR']

	i = 0
	while True:
		i += 1
		backup_path = f'{config_path}.{i}'
		if not os.path.exists(backup_path):
			break

	shutil.move(config_path, backup_path)
	click.echo(
		'The existing config directory was moved to ' +
		os.path.basename(backup_path)
	)

def setup_db():
	db_path = current_app.config['DATABASE']
	if os.path.exists(db_path):
		if click.confirm(
			'A database already exists. Would you like to create a new empty '
			'database?'
		):
			backup_db()
			db.init_db()
	else:
		db.init_db()

def backup_db():
	db_path = current_app.config['DATABASE']

	i = 0
	while True:
		i += 1
		backup_path = f'{db_path}.{i}'
		if not os.path.exists(backup_path):
			break

	shutil.move(db_path, backup_path)
	click.echo(
		f'The existing database was moved to {os.path.basename(backup_path)}'
	)

def setup_error_log_dir():
	os.makedirs(current_app.config['ERROR_LOG_DIR'], exist_ok=True)
