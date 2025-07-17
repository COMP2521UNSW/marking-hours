#!venv/bin/python3

import datetime, os, sys, traceback

from wsgiref.handlers import CGIHandler

from src import create_app

ERROR_LOG_DIR = 'instance/error-logs'

try:
	CGIHandler().run(create_app())
except Exception:
	# Create error report
	os.makedirs(ERROR_LOG_DIR, exist_ok=True)
	now = datetime.datetime.now()
	s = now.strftime('%Y-%m-%d-%H-%M-%S-%f')
	etype, evalue, etraceback = sys.exc_info()
	with open(f'{ERROR_LOG_DIR}/{s}.log', 'w') as f:
		f.write('\n'.join(traceback.format_exception_only(etype, evalue)))
		traceback.print_exc(file=f)

	# Sending nothing should trigger a 500

