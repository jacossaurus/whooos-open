tail -n +11 src/main.js > main.tmp.js
sed '$d' src/framework.js > framework.tmp.js
sed '$d' src/locations.js > locations.tmp.js
cat framework.tmp.js locations.tmp.js main.tmp.js > build/widget.js
rm main.tmp.js framework.tmp.js locations.tmp.js