import sys
import re
import json

def compare(fname):
    defs = None
    with open(fname,"r") as def_string:
        defs = json.loads(def_string.read())
    for prop in defs:
        for p in prop:
            print p
            print "\n"
    return fname

compare("alldefs.json")

