tail -n +8 src/main.js > main.tmp.js
sed '$d' src/framework.js > framework.tmp.js
cat framework.tmp.js main.tmp.js > build/widget.js
rm main.tmp.js framework.tmp.js