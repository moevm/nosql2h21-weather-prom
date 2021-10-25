CONVERTER="./ncdump-json -j"
FORMATTER="python -m json.tool"

chmod +x ./ncdump-json

for file in `find ./../region -type f -name "*.nc"`
do
   $CONVERTER $file | $FORMATTER > "${file::-3}.json"
done
