#!/bin/bash -e
{ # this ensures the entire script is downloaded #

# Stops the execution of a script if a command or pipeline has an error
set -e

# Functiom that prints the latest stable version
version() {
  echo "0.1.3"
}

echo "Downloading latest version from github $(version)"

#download latest
wget https://github.com/Webinate/blacktip/archive/v$(version).zip
unzip -o "v$(version).zip"

# Moves the server folder to the current directory
cp -r blacktip-$(version)/* ./

# Remove temp folder
if [ -d "blacktip-$(version)" ]; then
	rm blacktip-$(version) -R
fi

# Remove the zip file
rm "v$(version).zip"

# All done
echo "Blacktip $(version) successfully downloaded"
echo "Please run 'npm install' to complete installation"
exit
} # this ensures the entire script is downloaded #