#! /bin/sh
bundle install
bundle exec ruby restructure.rb
npm install --production
npm run build
exit
