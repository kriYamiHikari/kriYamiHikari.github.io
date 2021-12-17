# encoding=utf-8
from xml.dom import minidom

import glob
import re
from PIL import Image

path_file_number = glob.glob(r"images/*")
print(len(path_file_number))

doc = minidom.Document()

main = doc.createElement("main")
doc.appendChild(main)

for x in range(0, len(path_file_number)):
    item = doc.createElement('item')
    main.appendChild(item)

    itemPath = doc.createElement('path')
    itemWidth = doc.createElement('width')
    itemHeight = doc.createElement('height')

    pathText = path_file_number[x]

    itemPathText = doc.createTextNode(pathText)
    itemPath.appendChild(itemPathText)

    img = Image.open(pathText)
    w = img.width
    h = img.height

    # itemWidthText = doc.createTextNode(str(w) + 'px')
    itemWidthText = doc.createTextNode(str(w))
    itemWidth.appendChild(itemWidthText)

    # itemHeightText = doc.createTextNode(str(h) + 'px')
    itemHeightText = doc.createTextNode(str(h))
    itemHeight.appendChild(itemHeightText)

    item.appendChild(itemPath)
    item.appendChild(itemWidth)
    item.appendChild(itemHeight)

with open('imageList.xml', 'w+') as f:
    text = doc.toprettyxml().strip()
    f.write(text)
exit()
