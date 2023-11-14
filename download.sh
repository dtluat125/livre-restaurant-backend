echo "restart Xvfb"
killall -9 Xvfb
sleep 3
nohup Xvfb :1 -screen 0 1024x768x24 & export DISPLAY=:1
echo "Xvfb started"
sleep 3
node downloadFile.js
sleep 15
exit