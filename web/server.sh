#!/bin/bash

cd app
bundle install
bundle exec rake db:migrate
bundle exec rails server -b 0.0.0.0
