#!/bin/bash

/bin/sh -ec 'cd frontend && npm run start &'
/bin/sh -ec 'cd backend && npm run start'

