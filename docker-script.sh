#! /bin/sh
bundle install
bundle exec ruby restructure.rb
npm install
npm run pages
exit
