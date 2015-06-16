#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

echo "Downloading latest version from github dev"

#download latest
wget https://github.com/MKHenson/webinate-blacktip/archive/dev.zip
unzip -o "dev.zip"

# Moves the server folder to the current directory
cp -r webinate-blacktip-dev/resources/* ./resources
cp -r webinate-blacktip-dev/templates/* ./templates

# Remove modepress temp folder
if [ -d "webinate-blacktip-dev" ]; then
	rm webinate-blacktip-dev -R
fi

# Remove the zip file
rm "dev.zip"

# All done
echo "Blacktip successfully installed :)"
exit
} # this ensures the entire script is downloaded #