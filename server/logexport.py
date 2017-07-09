#!/usr/bin/env python
# -*- coding:utf-8 -*-

import pymongo

client = pymongo.MongoClient('localhost', 27017)
db = client.test
co = db.ntkanazawa2017
datas = [0]*230

for d in co.find():
    dd = d['data']
    k = dd['char']
    datas[k] += 1

for i in range(0,229):
    print str(i) + "," + str(datas[i])
