from nltk.corpus import wordnet
import nltk
import urllib
from urllib import urlopen
from weboscrape import webodef
from bs4 import BeautifulSoup
import wikipedia
import sys
import re
import json
## Dictionaries:
## 0 - Merriam Webster
## 1 - Wiki
## 2 - Webopedia
## 3 - OED

def getdefs(word):
	word = word.lower()
	worddef = {}
	worddef['word'] = word

################3##
## Webopedia scrape
	tdef = ''
	url = "http://www.webopedia.com/TERM/D/" + word + ".html"
	html = urlopen(url).read()
	try: 
		soup = BeautifulSoup(html)
		article = soup.find(id="article_main_column")
		next = article.find_all_next("p")
		for ndx, p in enumerate(next):
			strings = p.stripped_strings
			for string in strings:
				try:
					tdef += str(string) + " "	
				except:
					None
	except:
		None
	worddef[0] = tdef

#######################
## Merriam Webster API
	api_key = 'd6ed294b-9e3a-4897-8281-2c4c5ae8f2b1'
	query = ''
	service_url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/'
	search_term = word
	tdef = " "
	url = service_url + search_term + '?key=' + api_key
	try: 
		xmlread = urllib.urlopen(url).read()
		x = BeautifulSoup(xmlread, "xml")
		defs = x.find_all("dt")
		for ndx, dt in enumerate(defs):
			strings = dt.stripped_strings
 			for string in strings:
 				try:
 					tdef += str(string) + " "
 				except:
 					None
	except:
		None
	worddef[1] = str(tdef)

#######################
#### OED API
	service_url = 'http://www.oed.com/srupage?operation=searchRetrieve&query=cql.serverChoice+=+%22' 
	url = service_url + word + '%22&maximumRecords=1&startRecord=1'
	xmlread = urllib.urlopen(url).read()
	x = BeautifulSoup(xmlread, "xml")
	tag = x.description
	try:
		l1 = x.description.get_text()
		temp_def = ''
		for t in l1:
			try:
				temp_def += str(t)
			except: None
		temp_def = re.sub(r'<.*?>','',temp_def)
	except:
		temp_def = ''
	worddef[2] = temp_def

#######################
## Wikipedia function
	try: 
		wikidef = wikipedia.summary(word, sentences=5)
		temp_def = ''
		for w in wikidef:
			try: 
				temp_def += str(w)
			except:
				None
	except: 
		temp_def = ''
	worddef[3] = temp_def

#######################
### Wordnet function
	text = ''
	synsets = wordnet.synsets(word)
	try:
		text = synsets[0].definition
		#tokens = nltk.word_tokenize(text)
		#tags = nltk.pos_tag(tokens)
	except:
		None
	worddef[4] = text

#######################
### TechTerms Scrape
	tdef = ''
	url = "http://www.techterms.com/definition/" + word.replace(' ','')
	try: 
		print url
		html = urlopen(url).read()
		soup = BeautifulSoup(html)
		article = soup.find("article")
		#print "ARTICLE", article
		next = article.find_all_next('p')
		for p in next:
			strings = p.stripped_strings
			for string in strings:
				try:
					tdef += str(string) + " "
				except:
					None
	except:
		None
	worddef[5] = str(tdef)
	
	return worddef

alldefs = []
terms = open('techterms.txt','r').readlines()
for line in terms:
		print line
		alldefs.append(json.dumps(getdefs(line), sort_keys=True, indent=4))

with open('alldefs.json','w') as outfile:
	json.dump(alldefs, outfile)


#alldefsout.close()

if '__name__' == '__main__':
	main()



