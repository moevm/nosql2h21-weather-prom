CONVERTER="ncdump-json -j"
FORMATTER="python -m json.tool"

for file in `find ../ -type f -name "*.nc"`
do
    $CONVERTER $file | $FORMATTER > "${file::-3}.json"
    if [ "$1" == "--delete-source" ]; then
        rm -r $file
    fi
done
