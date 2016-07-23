#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

echo "Downloading latest version from github dev"

#download latest
wget https://github.com/Webinate/blacktip/archive/dev.zip
unzip -o "dev.zip"


# Moves the server folder to the current directory
cp -r blacktip-dev/* ./

# Remove modepress temp folder
if [ -d "blacktip-dev" ]; then
	rm blacktip-dev -R
fi

# Remove the zip file
rm "dev.zip"

# All done
echo "Blacktip $(version) successfully downloaded"
echo "Please run 'npm install' to complete installation"
exit
} # this ensures the entire script is downloaded #