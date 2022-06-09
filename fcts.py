import numpy as np
import nltk
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

# split sentence into array of words(word,punctuation character, or number)
def tokenize(sentence):
    
    return nltk.word_tokenize(sentence)

# stemming is finding the root form of the word
def stem(word):
    
    return stemmer.stem(word.lower())

# return bag of words array : 1 for each known word that exists in the sentence, 0 otherwise
def bag_of_words(tokenized_sentence, words):
    
    # stem each word
    sentence_words = [stem(word) for word in tokenized_sentence]
    # initialize bag with 0 for each word
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag
