import json
# import shutil

# shutil.copyfile('iconfont.ttf','../../static/font/iconfont-cc.ttf')

f = open('iconfont.json', encoding='utf-8')
content = f.read()
f.close()
user_dic = json.loads(content)['glyphs']
o = {}
for item in user_dic:
    strItem = '\\u' + item['unicode']
    o[item['font_class']] = strItem.encode('utf-8').decode('unicode-escape')
# print(o)
d = open('../../components/wlp-icons/icons.js', 'w', encoding='utf-8')
strJson = 'export default' + json.dumps(o)
# print(strJson)
d.write(strJson)
d.close()