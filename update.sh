#! /bin/sh
cd $(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
docker run -it --rm -v `pwd`:/app syon/tunes /bin/bash docker-script.sh
