FROM mwallasch/docker-ruby-node
RUN apt-get update && apt-get install -y libtag1-dev
RUN gem install --no-ri --no-rdoc bundler
RUN gem install --no-ri --no-rdoc awesome_print
RUN gem install --no-ri --no-rdoc taglib-ruby
RUN gem install --no-ri --no-rdoc ruby-audioinfo
