#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "v0.0.1"
}

echo "cleaning up folder..."

# Remove existing folders if they exist
if [ -d "js-libs" ]; then
	rm js-libs -R
fi
if [ -d "media" ]; then
	rm media -R
fi
if [ -d "templates" ]; then
	rm templates -R
fi


echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/MKHenson/webinate-blacktip/archive/master.zip
unzip -o "master.zip" "webinate-blacktip-master/bin/*"

# Moves the server folder to the current directory
mv webinate-blacktip-master/bin/* .

# Remove modepress-master
if [ -d "webinate-blacktip-master" ]; then
	rm webinate-blacktip-master -R
fi

# Remove the zip file
rm master.zip

# All done
echo "Blacktip successfully installed :)"
exit
} # this ensures the entire script is downloaded #