CONVERTER="./ncdump-json"

chmod +x ./ncdump-json

for file in `find ./../region -type f -name "*.nc"`
do
   $CONVERTER $file > "${file::-3}.json"
done
