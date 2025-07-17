
import os
import textwrap
import tomllib

from flask import current_app

########################################################################

def get_admins():
	return get_property_from_config('admins.toml', 'admins', [])

def get_assessments():
	return get_property_from_config('assessments.toml', 'assessments', [])

def get_tutors():
	return get_property_from_config('tutors.toml', 'tutors', [])

def get_property_from_config(config_relative_path, property, value_on_error):
	file_path = os.path.join(current_app.config['CONFIG_DIR'],
	                         config_relative_path)

	try:
		with open(file_path, 'rb') as f:
			data = tomllib.load(f)

		return data[property]

	except (FileNotFoundError, tomllib.TOMLDecodeError, KeyError):
		return value_on_error

########################################################################

def init_config():
	config_path = current_app.config['CONFIG_DIR']
	os.makedirs(config_path, exist_ok=True)

	admins_config_path = os.path.join(config_path, 'admins.toml')
	assessments_config_path = os.path.join(config_path, 'assessments.toml')
	tutors_config_path = os.path.join(config_path, 'tutors.toml')

	if not os.path.exists(admins_config_path):
		with open(admins_config_path, 'w') as f:
			f.write(textwrap.dedent('''
				# zids of admins
				admins = [
					'5123456', # example - delete this
				]
			'''))

	if not os.path.exists(assessments_config_path):
		with open(assessments_config_path, 'w') as f:
			f.write(textwrap.dedent('''
				# note: ids should not be modified after they are set
				assessments = [
					{ id = 'ass1', name = 'Assignment 1' },
				]
			'''))

	if not os.path.exists(tutors_config_path):
		with open(tutors_config_path, 'w') as f:
			f.write('\n')
			f.write('tutors = [\n')
			f.write(''.join(map(
				lambda t: f'\t{{ zid = \'{t[0]}\', name = "{t[1]}" }},\n',
				read_tutors()
			)))
			f.write(']\n')

def read_tutors():
	user = os.getenv('USER')
	give_period = os.getenv('GIVEPERIOD')

	with open(f'/web/{user}/{give_period}/tutors/tutors_names') as f:
		lines = f.readlines()

	def extract_tutor(line):
		components = line.rstrip().split('\t')
		return components[2].removeprefix('z'), components[3]

	return sorted(set(map(extract_tutor, lines)))

########################################################################
